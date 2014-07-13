var Assets;

(function() {



Assets = function() {
    this.assets = [];

    this.loading = 0;
    this.success = 0;
    this.errors  = 0;
    this.total   = 0;

// Set up DOM Elements
    var topContainer = document.getElementById("2D-loaders");
    if(!topContainer) {
        topContainer = document.createElement("div");
        topContainer.setAttribute("id", "2D-loaders");
        document.body.appendChild(topContainer);
    }
    this.container = document.createElement("div");
    this.container.setAttribute("class", "2D-loader");
    topContainer.appendChild(this.container);

    return this;
}

Assets.prototype.name = "assets-dom";
Assets.prototype.type = "Assets";

Assets.prototype.load = function(url, name) {
    var self = this;

// Update stats
    this.loading++;
    this.total++;

// Get MIME type (of first url)
    var mime = this.getMime(url);

// Create Asset object
    var obj = new Asset(url, name, mime);
    this.assets.push(obj);

// Add element
// Weird order because of 'onload' event not firing otherwise
    var elem;

    if(/image\//i.test(mime)) {
        elem = document.createElement("img");
        this.container.appendChild(elem);
        attachEvents(elem, obj, self);
        elem.setAttribute("src", url);
        elem.setAttribute("type", mime);
        elem.setAttribute("alt", name || url);
    }
    else if(/audio\//i.test(mime)) {
        elem = document.createElement("audio");
        var source = document.createElement("source");
        elem.appendChild(source);
        this.container.appendChild(elem);
        attachEvents(elem, obj, self);
        source.setAttribute("src", url);
        source.setAttribute("type", self.getMime(url));
    }        
    else if(/video\//i.test(mime)) {
        elem = document.createElement("video");
        var source = document.createElement("source");
        elem.appendChild(source);
        this.container.appendChild(elem);
        attachEvents(elem, obj, self);
        source.setAttribute("src", url);
        source.setAttribute("type", self.getMime(url));
    }
    else if(/text\//i.test(mime)) {
        elem = document.createElement("code");
        elem.setAttribute("style", "width:0;height:0;visibility:hidden;");
        this.container.appendChild(elem);

        var xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.onload = function(e) {
            elem.innerHTML = xhr.responseText || xhr.response;
            if(elem.onload) elem.onload();
        }
        xhr.onerror = function(e) {
            if(elem.onerror) elem.onerror();
        }
        attachEvents(elem, obj, self);
        xhr.send();
    }
    else {
        console.warn("WARN: Unknown file type passed to 'Assets.load()'. No element will be created.");
    }

    obj.element = elem;


    return this;
}

Assets.prototype.get = function(id) {
    var assets = this.assets;

    for(var i = 0, len = assets.length; i < len; i++) {
        var asset = assets[i];
        if(asset.url === id || asset.name === id) {
            return asset;
        }
    }

    return null;
}

Assets.prototype.getMime = function(url) {
    var split = url.split(".");
    var ext = split[split.length - 1];
    return this.mimes[ext];
}

Assets.prototype.mimes = {"323":"text/h323","*":"application/octet-stream","acx":"application/internet-property-stream","ai":"application/postscript","aif":"audio/x-aiff","aifc":"audio/x-aiff","aiff":"audio/x-aiff","asf":"video/x-ms-asf","asr":"video/x-ms-asf","asx":"video/x-ms-asf","au":"audio/basic","avi":"video/x-msvideo","axs":"application/olescript","bas":"text/plain","bcpio":"application/x-bcpio","bin":"application/octet-stream","bmp":"image/bmp","c":"text/plain","cat":"application/vnd.ms-pkiseccat","cdf":"application/x-cdf","cdf":"application/x-netcdf","cer":"application/x-x509-ca-cert","class":"application/octet-stream","clp":"application/x-msclip","cmx":"image/x-cmx","cod":"image/cis-cod","cpio":"application/x-cpio","crd":"application/x-mscardfile","crl":"application/pkix-crl","crt":"application/x-x509-ca-cert","csh":"application/x-csh","css":"text/css","dcr":"application/x-director","der":"application/x-x509-ca-cert","dir":"application/x-director","dll":"application/x-msdownload","dms":"application/octet-stream","doc":"application/msword","dot":"application/msword","dvi":"application/x-dvi","dxr":"application/x-director","eps":"application/postscript","etx":"text/x-setext","evy":"application/envoy","exe":"application/octet-stream","fif":"application/fractals","flr":"x-world/x-vrml","gif":"image/gif","gtar":"application/x-gtar","gz":"application/x-gzip","h":"text/plain","hdf":"application/x-hdf","hlp":"application/winhlp","hqx":"application/mac-binhex40","hta":"application/hta","htc":"text/x-component","htm":"text/html","html":"text/html","shtml":"text/html","htt":"text/webviewhtml","ico":"image/x-icon","ief":"image/ief","iii":"application/x-iphone","ins":"application/x-internet-signup","isp":"application/x-internet-signup","jfif":"image/pipeg","jpe":"image/jpeg","jpeg":"image/jpeg","jpg":"image/jpeg","js":"application/x-javascript","latex":"application/x-latex","lha":"application/octet-stream","lsf":"video/x-la-asf","lsx":"video/x-la-asf","lzh":"application/octet-stream","m13":"application/x-msmediaview","m14":"application/x-msmediaview","m3u":"audio/x-mpegurl","man":"application/x-troff-man","mdb":"application/x-msaccess","me":"application/x-troff-me","mht":"message/rfc822","mhtml":"message/rfc822","mid":"audio/mid","mny":"application/x-msmoney","mov":"video/quicktime","movie":"video/x-sgi-movie","mp2":"video/mpeg","mp3":"audio/mpeg","mpa":"video/mpeg","mpe":"video/mpeg","mpeg":"video/mpeg","mpg":"video/mpeg","mpp":"application/vnd.ms-project","mpv2":"video/mpeg","ms":"application/x-troff-ms","msg":"application/vnd.ms-outlook","mvb":"application/x-msmediaview","nc":"application/x-netcdf","nws":"message/rfc822","oda":"application/oda","p10":"application/pkcs10","p12":"application/x-pkcs12","p7b":"application/x-pkcs7-certificates","p7c":"application/x-pkcs7-mime","p7m":"application/x-pkcs7-mime","p7r":"application/x-pkcs7-certreqresp","p7s":"application/x-pkcs7-signature","pbm":"image/x-portable-bitmap","pdf":"application/pdf","pfx":"application/x-pkcs12","pgm":"image/x-portable-graymap","pko":"application/ynd.ms-pkipko","pma":"application/x-perfmon","pmc":"application/x-perfmon","pml":"application/x-perfmon","pmr":"application/x-perfmon","pmw":"application/x-perfmon","pnm":"image/x-portable-anymap","pot":"application/vnd.ms-powerpoint","ppm":"image/x-portable-pixmap","pps":"application/vnd.ms-powerpoint","ppt":"application/vnd.ms-powerpoint","prf":"application/pics-rules","ps":"application/postscript","pub":"application/x-mspublisher","qt":"video/quicktime","ra":"audio/x-pn-realaudio","ram":"audio/x-pn-realaudio","ras":"image/x-cmu-raster","rgb":"image/x-rgb","rmi":"audio/mid","roff":"application/x-troff","rtf":"application/rtf","rtx":"text/richtext","scd":"application/x-msschedule","sct":"text/scriptlet","setpay":"application/set-payment-initiation","setreg":"application/set-registration-initiation","sh":"application/x-sh","shar":"application/x-shar","sit":"application/x-stuffit","snd":"audio/basic","spc":"application/x-pkcs7-certificates","spl":"application/futuresplash","src":"application/x-wais-source","sst":"application/vnd.ms-pkicertstore","stl":"application/vnd.ms-pkistl","stm":"text/html","sv4cpio":"application/x-sv4cpio","sv4crc":"application/x-sv4crc","svg":"image/svg+xml","swf":"application/x-shockwave-flash","t":"application/x-troff","tar":"application/x-tar","tcl":"application/x-tcl","tex":"application/x-tex","texi":"application/x-texinfo","texinfo":"application/x-texinfo","tgz":"application/x-compressed","tif":"image/tiff","tiff":"image/tiff","tr":"application/x-troff","trm":"application/x-msterminal","tsv":"text/tab-separated-values","txt":"text/plain","uls":"text/iuls","ustar":"application/x-ustar","vcf":"text/x-vcard","vrml":"x-world/x-vrml","wav":"audio/x-wav","wcm":"application/vnd.ms-works","wdb":"application/vnd.ms-works","wks":"application/vnd.ms-works","wmf":"application/x-msmetafile","wps":"application/vnd.ms-works","wri":"application/x-mswrite","wrl":"x-world/x-vrml","wrz":"x-world/x-vrml","xaf":"x-world/x-vrml","xbm":"image/x-xbitmap","xla":"application/vnd.ms-excel","xlc":"application/vnd.ms-excel","xlm":"application/vnd.ms-excel","xls":"application/vnd.ms-excel","xlt":"application/vnd.ms-excel","xlw":"application/vnd.ms-excel","xof":"x-world/x-vrml","xpm":"image/x-xpixmap","xwd":"image/x-xwindowdump","z":"application/x-compress","zip":"application/zip"};





/*
 * Asset
 *
 * Object that contains some info about an asset, like URL, name, MIME type, etc.
 */

var Asset = function(url, name, mime) {
    this.url = url;
    this.name = name;
    this.mime = mime;

    this.done = false;
    this.error=  false;

    return this;
}

// Attach to Assets
Assets.prototype.Asset = Asset;



var attachEvents = function(elem, obj, assets) {
    elem.onload = function(e) {
        assets.loading--;
        assets.success++;
        obj.done = true;
    }
    elem.onerror = function(e) {
        assets.loading--;
        assets.errors++;
        obj.done = true;
        obj.error = true;
    }
}



})()