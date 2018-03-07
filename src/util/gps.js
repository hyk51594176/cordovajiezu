/**
 * Created by hanxu on 2017/2/7.
 */
export default  {
    PI: 3.14159265358979324,
    x_pi: 3.14159265358979324 * 3000.0 / 180.0,
    delta(lat, lon){
        // Krasovsky 1940
        //
        // a = 6378245.0, 1/f = 298.3
        // b = a * (1 - f)
        // ee = (a^2 - b^2) / a^2;
        let a = 6378245.0;
        let ee = 0.00669342162296594323;
        let dLat = this.transformLat(lon - 105.0, lat - 35.0);
        let dLon = this.transformLon(lon - 105.0, lat - 35.0);
        let radLat = lat / 180.0 * this.PI;
        let magic = Math.sin(radLat);
        magic = 1 - ee * magic * magic;
        let sqrtMagic = Math.sqrt(magic);
        dLat = (dLat * 180.0) / ((a * (1 - ee)) / (magic * sqrtMagic) * this.PI);
        dLon = (dLon * 180.0) / (a / sqrtMagic * Math.cos(radLat) * this.PI);
        return {
            lat: dLat,
            lng: dLon
        };
    },
    //WGS-84 to GCJ-02
    gcj_encrypt(wgsLat, wgsLon){
        if (this.outOfChina(wgsLat, wgsLon))
            return {
                lat: wgsLat,
                lng: wgsLon
            };

        let d = this.delta(wgsLat, wgsLon);
        return {
            lat: wgsLat + d.lat,
            lng: wgsLon + d.lng
        };
    },
    //GCJ-02 to WGS-84
    gcj_decrypt(gcjLat, gcjLon){

        if (this.outOfChina(gcjLat, gcjLon))
            return {
                lat: gcjLat,
                lng: gcjLon
            };

        let d = this.delta(gcjLat, gcjLon);
        return {
            lat: gcjLat - d.lat,
            lng: gcjLon - d.lng
        };
    },
    //GCJ-02 to WGS-84 exactly
    gcj_decrypt_exact  (gcjLat, gcjLon){
        let initDelta = 0.01;
        let threshold = 0.000000001;
        let dLat = initDelta,
            dLon = initDelta;
        let mLat = gcjLat - dLat,
            mLon = gcjLon - dLon;
        let pLat = gcjLat + dLat,
            pLon = gcjLon + dLon;
        let wgsLat, wgsLon, i = 0;
        while (1) {
            wgsLat = (mLat + pLat) / 2;
            wgsLon = (mLon + pLon) / 2;
            let tmp = this.gcj_encrypt(wgsLat, wgsLon)
            dLat = tmp.lat - gcjLat;
            dLon = tmp.lon - gcjLon;
            if ((Math.abs(dLat) < threshold) && (Math.abs(dLon) < threshold))
                break;

            if (dLat > 0) pLat = wgsLat;
            else mLat = wgsLat;
            if (dLon > 0) pLon = wgsLon;
            else mLon = wgsLon;

            if (++i > 10000) break;
        }
        //console.log(i);
        return {
            lat: wgsLat,
            lng: wgsLon
        };
    },
    //GCJ-02 to BD-09
    bd_encrypt(gcjLat, gcjLon){
        let x = gcjLon,
            y = gcjLat;
        let z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * this.x_pi);
        let theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * this.x_pi);
        bdLon = z * Math.cos(theta) + 0.0065;
        bdLat = z * Math.sin(theta) + 0.006;
        return {
            lat: bdLat,
            lng: bdLon
        };
    },
    //BD-09 to GCJ-02
    bd_decrypt (bdLat, bdLon){
        let x = bdLon - 0.0065,
            y = bdLat - 0.006;
        let z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * this.x_pi);
        let theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * this.x_pi);
        let gcjLon = z * Math.cos(theta);
        let gcjLat = z * Math.sin(theta);
        return {
            lat: gcjLat,
            lng: gcjLon
        };
    },
    distance(point1, point2) {
        let earthR = 6371000;
        let x = Math.cos(point1.lat * Math.PI / 180) * Math.cos(point2.lat * Math.PI / 180) * Math.cos((point1.lng - point2.lng) * Math.PI / 180);
        let y = Math.sin(point1.lat * Math.PI / 180) * Math.sin(point2.lat * Math.PI / 180);
        let s = x + y;
        if (s > 1)
            s = 1;
        if (s < -1)
            s = -1;
        let alpha = Math.acos(s);
        let distance = alpha * earthR;
        return distance;
    },
    outOfChina(lat, lon){
        if (lon < 72.004 || lon > 137.8347)
            return true;
        if (lat < 0.8293 || lat > 55.8271)
            return true;
        return false;
    },
    transformLat(x, y){
        let ret = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * Math.sqrt(Math.abs(x));
        ret += (20.0 * Math.sin(6.0 * x * this.PI) + 20.0 * Math.sin(2.0 * x * this.PI)) * 2.0 / 3.0;
        ret += (20.0 * Math.sin(y * this.PI) + 40.0 * Math.sin(y / 3.0 * this.PI)) * 2.0 / 3.0;
        ret += (160.0 * Math.sin(y / 12.0 * this.PI) + 320 * Math.sin(y * this.PI / 30.0)) * 2.0 / 3.0;
        return ret;
    },
    transformLon(x, y){
        let ret = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.sqrt(Math.abs(x));
        ret += (20.0 * Math.sin(6.0 * x * this.PI) + 20.0 * Math.sin(2.0 * x * this.PI)) * 2.0 / 3.0;
        ret += (20.0 * Math.sin(x * this.PI) + 40.0 * Math.sin(x / 3.0 * this.PI)) * 2.0 / 3.0;
        ret += (150.0 * Math.sin(x / 12.0 * this.PI) + 300.0 * Math.sin(x / 30.0 * this.PI)) * 2.0 / 3.0;
        return ret;
    }
}