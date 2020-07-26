require(['dojo/_base/kernel', 'dojo/ready'], function (dojo, ready) {
	ready(function () {
        document.addEventListener('paste', async (event) => {
            try {
                await tryPasteLink(event);
            }
            catch(e) {
            }
        });
	});
});

async function tryPasteLink(event) {
    if(event.target.id != 'feedDlg_feedUrl')
        return;

    let text = (event.clipboardData || window.clipboardData).getData('text');
    let url = new URL(text);

    if(isYoutubeLink(url)) {
        event.target.value = await getRssFeedUrl(url);
        event.preventDefault();
    }
}

async function getRssFeedUrl(url) {
    let lastPart = url.pathname.split('/').pop();

    if(lastPart.startsWith("UC") || lastPart.startsWith("HC")) {
        return `https://www.youtube.com/feeds/videos.xml?channel_id=${lastPart}`
    }
    else if(url.pathname.startsWith('/c') && !url.pathname.startsWith('/channel')) {
        return `https://www.youtube.com/feeds/videos.xml?channel_id=${await getChannelId(lastPart)}`
    }
    else {
        return `https://www.youtube.com/feeds/videos.xml?user=${lastPart}`
    }
}

// TODO: this should fetch a channel id but i can't a solution without using a api key
async function getChannelId(channelName) {
    return ``;
}

function isYoutubeLink(url) {
    if(url.hostname != 'www.youtube.com')
        return false;

    if(!url.pathname.startsWith('/c') && !url.pathname.startsWith('/user') && !url.pathname.startsWith('/channel'))
        return false;

    return true;
}
