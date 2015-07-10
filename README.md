# Slack API for Meteor.js

A Meteor wrapper for the Slack API

# Install

Add `khamoud:slack-api` to your applications `.meteor/packages` file

Alternatively:
```
meteor add khamoud:slack-api
```
# How to use

`SlackAPI` is a global object **server side only***

It is used to make the method calls which can be synchronous or asynchronous.

Asynchronous calls will return a callback with one `error` argument upon failure or return the object as the second argument upon success.

```javascript
// async calls
SlackAPI.api.test({good:1}, function(err,res){
    console.log(err); // will return null
    console.log(res); // will return {"ok":true, "args":{good:1}}
});

SlackAPI.api.test({good:1, error:1}, function(err,res){
    console.log(err); // will return {"ok":false, "error":1, "args":{good:1, error:1}}
    console.log(res); // will return undefined
});

// sync calls
SlackAPI.api.test({good:1}); // return {"ok":true, "args":{good:1}}
SlackAPI.api.test({good:1, error:1}) // return  {"ok":false, "error":1, "args":{good:1, error:1}}
```

# Documentation

Each API method receives arguments for the request, and an optional callback function to execute once the request has completed. The available request parameters are explained for each method below.

Each `callback` function receives one or two arguments: `error` and `response` (one for errors, two for success).

`error` applicable when there's an issue with the request connection.

`response` is the request response body parsed as JSON.

## Overview

### api

* [SlackAPI.api.test(obj, callback)](https://api.slack.com/methods/api.test)

### auth

* [SlackAPI.auth.test(token, callback)](https://api.slack.com/methods/auth.test)

### channels

* [SlackAPI.channels.archive(token, channel, callback)](https://api.slack.com/methods/channels.archive)
* [SlackAPI.channels.create(token, name, callback)](https://api.slack.com/methods/channels.create)
* [SlackAPI.channels.history(token, channel, latest, oldest, inclusive, count, callback)](https://api.slack.com/methods/channels.history)
* [SlackAPI.channels.info(token, channel, callback)](https://api.slack.com/methods/channels.info)
* [SlackAPI.channels.invite(token, channel, user, callback)](https://api.slack.com/methods/channels.invite)
* [SlackAPI.channels.join(token, name, callback)](https://api.slack.com/methods/channels.join)
* [SlackAPI.channels.kick(token, channel, user, callback)](https://api.slack.com/methods/channels.kick)
* [SlackAPI.channels.leave(token, channel, callback)](https://api.slack.com/methods/channels.leave)
* [SlackAPI.channels.list(token, callback)](https://api.slack.com/methods/channels.list)
* [SlackAPI.channels.mark(token, channel, name, callback)](https://api.slack.com/methods/channels.mark)
* [SlackAPI.channels.rename(token, channel, name, callback)](https://api.slack.com/methods/channels.rename)
* [SlackAPI.channels.setPurpose(token, channel, purpose, callback)](https://api.slack.com/methods/channels.setPurpose)
* [SlackAPI.channels.setTopic(token, channel, topic, callback)](https://api.slack.com/methods/channels.setTopic)
* [SlackAPI.channels.unarchive(token, channel,callback)](https://api.slack.com/methods/channels.unarchive)

### chat

* [SlackAPI.chat.delete(token, ts, channel, callback)](https://api.slack.com/methods/chat.delete)
* [SlackAPI.chat.postMessage(token, channelId, message, options, callback)](https://api.slack.com/methods/chat.postMessage)
* [SlackAPI.chat.update(token, ts, channel, text, callback)](https://api.slack.com/methods/chat.update)

### emoji

* [SlackAPI.emoji.list(token, callback)](https://api.slack.com/methods/emoji.list)

### files

* [SlackAPI.files.delete(token, file, callback)](https://api.slack.com/methods/files.delete)
* [SlackAPI.files.info(token, file, count, page, callback)](https://api.slack.com/methods/files.info)
* [SlackAPI.files.list(token, user, ts_from, ts_to, types, count, page, callback)](https://api.slack.com/methods/files.list)
* [SlackAPI.files.upload(token, file, content, filetype, title, initial_comment, channels, callback)](https://api.slack.com/methods/files.upload)

### groups

* [SlackAPI.groups.archive(token, channel, callback)](https://api.slack.com/methods/groups.archive)
* [SlackAPI.groups.close(token,channel, callback)](https://api.slack.com/methods/groups.close)
* [SlackAPI.groups.create(token, name,callback)](https://api.slack.com/methods/groups.create)
* [SlackAPI.groups.createChild(token, channel, callback)](https://api.slack.com/methods/groups.createChild)
* [SlackAPI.groups.history(token, channel, latest, oldest, inclusive, count, callback)](https://api.slack.com/methods/groups.history)
* [SlackAPI.groups.info(token, channel, callback)](https://api.slack.com/methods/groups.info)
* [SlackAPI.groups.invite(token, channel, user,callback)](https://api.slack.com/methods/groups.invite)
* [SlackAPI.groups.kick(token, channel, user, callback)](https://api.slack.com/methods/groups.kick)
* [SlackAPI.groups.leave(token, channel,callback)](https://api.slack.com/methods/groups.leave)
* [SlackAPI.groups.list(token, exclude_archived, callback)](https://api.slack.com/methods/groups.list)
* [SlackAPI.groups.mark(token, channel, ts, callback)](https://api.slack.com/methods/groups.mark)
* [SlackAPI.groups.open(token, channel, callback)](https://api.slack.com/methods/groups.open)
* [SlackAPI.groups.rename(token, channel, name, callback)](https://api.slack.com/methods/groups.rename)
* [SlackAPI.groups.setPurpose(token, channel, purpose, callback)](https://api.slack.com/methods/groups.setPurpose)
* [SlackAPI.groups.setTopic(token, channel, topic, callback)](https://api.slack.com/methods/groups.setTopic)
* [SlackAPI.groups.unarchive(token, channel, callback)](https://api.slack.com/methods/groups.unarchive)

### im

* [SlackAPI.im.close(token, channel, callback)](https://api.slack.com/methods/im.close)
* [SlackAPI.im.history(token, channel, callback)](https://api.slack.com/methods/im.history)
* [SlackAPI.im.list(token, callback)](https://api.slack.com/methods/im.list)
* [SlackAPI.im.mark(token, channel, ts, callback)](https://api.slack.com/methods/im.mark)
* [SlackAPI.im.open(token, userId, callback)](https://api.slack.com/methods/im.open)

### oauth

* [SlackAPI.oauth.access(client_id, client_secret, code, redirect_uri, callback)](https://api.slack.com/methods/oauth.access)

### rtm

* [SlackAPI.rtm.start(token, callback)](https://api.slack.com/methods/rtm.start)

### search

* [SlackAPI.search.all(token, query, sort, sort_dir, highlight, count, page, callback)](https://api.slack.com/methods/search.all)
* [SlackAPI.search.files(token, query, sort, sort_dir, highlight, count, page, callback)](https://api.slack.com/methods/search.files)
* [SlackAPI.search.messages(token, query, sort, sort_dir, highlight, count, page, callback)](https://api.slack.com/methods/search.messages)

### stars

* [SlackAPI.stars.list(token, user, count, page, callback)](https://api.slack.com/methods/stars.list)

### team

* [SlackAPI.team.accessLogs(token, count, page, callback)](https://api.slack.com/methods/team.accessLogs)
* [SlackAPI.team.info(token, callback)](https://api.slack.com/methods/team.info)

### users

* [SlackAPI.users.getPresence(token, callback)](https://api.slack.com/methods/users.getPresence)
* [SlackAPI.users.info(token, userId, callback)](https://api.slack.com/methods/users.info)
* [SlackAPI.users.list(token, callback)](https://api.slack.com/methods/users.list)
* [SlackAPI.users.setActive(token, callback)](https://api.slack.com/methods/users.setActive)
* [SlackAPI.users.setPresence(token, presence, callback)](https://api.slack.com/methods/users.setPresence)
