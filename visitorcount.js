function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/; SameSite=Lax";
    console.log(`Set cookie: ${name}=${value}; expires=${expires}`);
}

function getCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

async function get_visitors() {
    let visitCookie = getCookie("unique_visitor");
    console.log(`Visit cookie: ${visitCookie}`);
    
    if (!visitCookie) {
        try {
            let url = 'https://0s449od82e.execute-api.us-east-1.amazonaws.com/PROD/visitors?count=true';
            console.log(`Making API request to: ${url}`);
            let response = await fetch(url, { method: 'GET' });

            if (response.ok) {
                let data = await response.json();
                let viewCount = data.body;
                document.getElementById("visitors").innerHTML = viewCount;
                console.log(`Visitor count updated: ${viewCount}`);
                setCookie("unique_visitor", "true", 365);
                console.log('Unique visitor cookie set.');
                return data;
            } else {
                console.error('Failed to fetch visitor count:', response.status, response.statusText);
            }
        } catch (err) {
            console.error(err);
        }
    } else {
        console.log('Visitor already counted.');
        try {
            let url = 'https://0s449od82e.execute-api.us-east-1.amazonaws.com/PROD/visitors';
            console.log(`Making API request to: ${url}`);
            let response = await fetch(url, { method: 'GET' });

            if (response.ok) {
                let data = await response.json();
                let viewCount = data.body;
                document.getElementById("visitors").innerHTML = viewCount;
                console.log(`Visitor count fetched: ${viewCount}`);
                return data;
            } else {
                console.error('Failed to fetch visitor count:', response.status, response.statusText);
            }
        } catch (err) {
            console.error(err);
        }
    }
}

get_visitors();
