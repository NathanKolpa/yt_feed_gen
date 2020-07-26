require(['dojo/_base/kernel', 'dojo/ready'], function (dojo, ready) {
    ready(function () {
        document.addEventListener('paste', async (event) => {
            try {
                await tryPasteLink(event);
            } catch (e) {
            }
        });
    });
});

async function tryPasteLink(event) {
    if (event.target.id !== 'feedDlg_feedUrl')
        return;

    let text = (event.clipboardData || window.clipboardData).getData('text');
    let url = new URL(text);

    if (isValidYoutubeLink(url)) {
        event.target.value = await getRssFeedUrl(url);
        event.preventDefault();
    }
}

async function getRssFeedUrl(url) {

    let lastPart = url.pathname.split('/').pop();

    if (isChannelId(url)) {
        return getRssLinkFromChannelId(lastPart);
    } else if (isChannelName(url)) {
        return await getRssLinkFromChannelName(lastPart);
    } else if (isUser(url)) {
        return getRssLinkFromUser(lastPart);
    }

    throw new Error("channel format not recognized");
}

// TODO: this should fetch a channel id but I can't find a solution without using a api key
async function getRssLinkFromChannelName(channelName) {
    throw new Error("not implemented");
}

function getRssLinkFromChannelId(channelId) {
    return `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`
}

function getRssLinkFromUser(userName) {
    return `https://www.youtube.com/feeds/videos.xml?user=${userName}`
}

function isChannelId(url) {
    let lastPart = url.pathname.split('/').pop();
    return lastPart.startsWith("UC") || lastPart.startsWith("HC");
}

function isChannelName(url) {
    return !isChannelId(url) && (url.pathname.startsWith('/c') || url.pathname.startsWith('/channel'));
}

function isUser(url) {
    return url.pathname.startsWith('/user')
}

function isValidYoutubeLink(url) {
    if (url.hostname !== 'www.youtube.com')
        return false;

    return !(!url.pathname.startsWith('/c') && !url.pathname.startsWith('/user') && !url.pathname.startsWith('/channel'));


}
