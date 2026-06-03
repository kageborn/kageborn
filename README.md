
*{
    margin:0;
    padding:0;
    box-sizing:border-box;
}

body{
    background:#08111f;
    color:#ffffff;
    font-family:arial,sans-serif;
    line-height:1.6;
}

.container{
    width:90%;
    max-width:1200px;
    margin:auto;
}

.site-header{
    background:#0d1b2f;
    border-bottom:1px solid rgba(255,255,255,.08);
    position:sticky;
    top:0;
    z-index:100;
}

.header-row{
    display:flex;
    justify-content:space-between;
    align-items:center;
    padding:18px 0;
}

.brand{
    display:flex;
    align-items:center;
    gap:12px;
}

.brand img{
    width:50px;
    height:50px;
    object-fit:contain;
}

.brand span{
    font-size:22px;
    font-weight:700;
}

nav{
    display:flex;
    gap:25px;
}

nav a{
    color:white;
    text-decoration:none;
    transition:.2s;
}

nav a:hover{
    color:#4ea3ff;
}

.hero{
    padding:80px 0;
}

.hero-grid{
    display:grid;
    grid-template-columns:1fr 1fr;
    gap:50px;
    align-items:center;
}

.tag{
    display:inline-block;
    background:#1d4ed8;
    padding:8px 14px;
    border-radius:999px;
    margin-bottom:15px;
}

.hero h1{
    font-size:64px;
    margin-bottom:15px;
}

.hero p{
    color:#cbd5e1;
    margin-bottom:20px;
}

.launch-box{
    background:#0f2747;
    border:1px solid #2563eb;
    border-radius:12px;
    padding:16px;
    margin-bottom:25px;
    font-weight:bold;
}

.buttons{
    display:flex;
    gap:15px;
    flex-wrap:wrap;
}

.btn{
    padding:14px 24px;
    border-radius:10px;
    text-decoration:none;
    font-weight:bold;
}

.primary{
    background:#2563eb;
    color:white;
}

.secondary{
    background:#17263f;
    color:white;
}

.hero-image img{
    width:100%;
    border-radius:18px;
    display:block;
}

.section{
    padding:80px 0;
}

.section-title{
    text-align:center;
    max-width:700px;
    margin:auto auto 50px;
}

.section-title span{
    color:#60a5fa;
    text-transform:uppercase;
}

.section-title h2{
    font-size:40px;
    margin:10px 0;
}

.section-title p{
    color:#cbd5e1;
}

.blue-section{
    background:#0b1728;
}

.features-grid{
    display:grid;
    grid-template-columns:repeat(auto-fit,minmax(250px,1fr));
    gap:25px;
}

.feature-card{
    background:#12233d;
    padding:25px;
    border-radius:15px;
    border:1px solid rgba(255,255,255,.05);
}

.feature-card h3{
    margin-bottom:10px;
}

.feature-card p{
    color:#cbd5e1;
}

.gallery-grid{
    display:grid;
    grid-template-columns:repeat(3,1fr);
    gap:20px;
}

.gallery-grid img{
    width:100%;
    border-radius:15px;
    display:block;
}

.community-box{
    background:#10203a;
    border-radius:20px;
    padding:40px;
    display:flex;
    justify-content:space-between;
    align-items:center;
    gap:30px;
}

.community-links{
    display:flex;
    gap:15px;
    flex-wrap:wrap;
}

.community-links a{
    text-decoration:none;
    color:white;
    background:#2563eb;
    padding:12px 22px;
    border-radius:10px;
}

footer{
    background:#06101d;
    border-top:1px solid rgba(255,255,255,.08);
}

.footer-row{
    padding:25px 0;
    text-align:center;
    color:#94a3b8;
}

@media(max-width:900px){

    .hero-grid{
        grid-template-columns:1fr;
    }

    .gallery-grid{
        grid-template-columns:1fr;
    }

    .community-box{
        flex-direction:column;
        text-align:center;
    }

    .header-row{
        flex-direction:column;
        gap:15px;
    }

    .hero h1{
        font-size:42px;
    }
}
