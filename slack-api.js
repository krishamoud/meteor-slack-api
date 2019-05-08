// Write your package code here!
Future = Npm.require('fibers/future');
SlackAPI = {

    // base api call
    _apiCall: function(method, params, callback) {
        callback  = typeof callback  !== "undefined" ? callback  : false;
        if(!callback){
            var future = new Future();
            HTTP.get("https://slack.com/api/" + method, {
                params: params
            }, function(err, message) {
                if(err) {
                    future.throw(err);
                } else if(!message.data.ok){
                    future.return(message.data);
                } else {
                    // Send back the relevant part of the payload.
                    future.return(message.data)
                }
            })
            return future.wait();
        } else {
            HTTP.get("https://slack.com/api/" + method, {
                params: params
            }, function(err, message) {
                if(err) {
                    return callback(err)
                } else if(!message.data.ok){
                    return callback(message.data);
                } else {
                    // Send back the relevant part of the payload.
                    return callback(null, message.data)
                }
            })
        }
    },

    // api
    api: {
        test:function(params, callback){
            return SlackAPI._apiCall('api.test', params, callback);
        }
    },

    // auth
    auth: {
        test:function(token, callback){
            var params = {
                token:token
            };

            return SlackAPI._apiCall('auth.test', params, callback);
        }
    },

    // channels
    channels: {
        archive:function(token, channel, callback){
            var params = {
                token:token,
                channel: channel
            };
            return SlackAPI._apiCall('channels.archive', params, callback);
        },
        create:function(token, name, callback){
            var params = {
                token: token,
                name:name
            };
            return SlackAPI._apiCall('channels.create', params, callback);
        },
        history:function(token, channel, latest, oldest, inclusive, count, callback){
            var time = Date.now();
            latest   = typeof latest    !== "undefined" ? latest : time;
            oldest   = typeof oldest    !== "undefined" ? oldest : 0;
            inclusive= typeof inclusive !== "undefined" ? inclusive : 0;
            count    = typeof count     !== "undefined" ? count  : 100;
            var params = {
                token: token,
                channel: channel,
                latest: latest,
                oldest: oldest,
                inclusive: inclusive,
                count: count
            };
            return SlackAPI._apiCall('channels.history', params, callback);
        },
        info:function(token, channel, callback){
            var params = {
                token: token,
                channel: channel
            };
            return SlackAPI._apiCall('channels.info', params, callback);
        },
        invite:function(token, channel, user, callback){
            var params = {
                token:token,
                channel:channel,
                user:user
            };
            return SlackAPI._apiCall('channels.invite', params, callback);
        },
        join:function(token, name, callback){
            var params = {
                token: token,
                name: name
            };
            return SlackAPI._apiCall('channels.join', params, callback);
        },
        kick:function(token, channel, user, callback){
            var params = {
                token: token,
                channel: channel,
                user:user
            };
            return SlackAPI._apiCall('channels.kick', params, callback);
        },
        leave:function(token, channel, callback){
            var params = {
                token: token,
                channel: channel
            };
            return SlackAPI._apiCall('channels.leave', params, callback);
        },
        list:function(accessToken, callback){
            var params = {
                    token: accessToken
            }
            return SlackAPI._apiCall('channels.list', params, callback);
        },
        mark:function(token, channel, ts, callback){
            var params = {
                token: token,
                channel: channel,
                ts: ts
            };
            return SlackAPI._apiCall('channels.mark', params, callback);
        },
        rename:function(token, channel, name, callback){
            var params = {
                token: token,
                channel: channel,
                name:name
            };
            return SlackAPI._apiCall('channels.rename', params, callback);
        },
        setPurpose:function(token, channel, purpose, callback){
            var params = {
                token: token,
                channel: channel,
                purpose: purpose
            };
            return SlackAPI._apiCall('channels.setPurpose', params, callback);
        },
        setTopic:function(token, channel, topic, callback){
            var params = {
                token: token,
                channel: channel,
                topic:topic
            };
            return SlackAPI._apiCall('channels.setTopic', params, callback);
        },
        unarchive:function(token, channel, callback){
            var params = {
                token: token,
                channel: channel
            };
            return SlackAPI._apiCall('channels.unarchive', params, callback);
        }
    },

    // chat
    chat:{
        delete:function(token, ts, channel, callback){
            var params = {
                token: token,
                ts: ts,
                channel: channel
            };
            return SlackAPI._apiCall('chat.delete', params, callback);
        },
        postMessage:function(accessToken, channelId, message, options, callback){
            var params = {
                token: accessToken,
                channel: channelId,
                text: message
            };
            // List of possible options fields in options.
            var optionsList = ['as_user', 'parse', 'attachments', 'link_names', 'unfurl_links', 'username', 'icon_url', 'icon_emoji', 'blocks', 'mrkdwn', 'reply_broadcast', 'thread_ts', 'unfurl_media'];
            // Append relevant params from options.
            _.each(optionsList, function(opt) {
                if (!_.isUndefined(options[opt])) {
                    if (opt === 'attachments' || opt === 'blocks') {
                        options[opt] = JSON.stringify(options[opt]); // JSON-encoded array of attachment hashes
                    }
                    params[opt] = options[opt];
                }
            });
            return SlackAPI._apiCall('chat.postMessage', params, callback);
        },
        update:function(token, ts, channel, text, callback){
            var params = {
                token: token,
                ts: ts,
                channel: channel,
                text: text
            };
            return SlackAPI._apiCall('chat.update', params, callback);
        }
    },

    // emoji
    emoji:{
        list:function(token, callback){
            var params = {
                token: token
            };
            return SlackAPI._apiCall('emoji.list', params, callback);
        }
    },

    // files
    files: {
        delete:function(token, file, callback){
            var params = {
                token: token,
                file: file
            };
            return SlackAPI._apiCall('files.delete', params, callback);
        },
        info:function(token, file, count, page, callback){
            count   = typeof count !== "undefined" ? count : 100;
            page    = typeof page  !== "undefined" ? page  : 1;
            var params = {
                token: token,
                file: file,
                count: count,
                page: page
            };
            return SlackAPI._apiCall('files.info', params, callback);
        },
        list:function(token, user, ts_from, ts_to, types, count, page, callback){
            var time= Date.now();
            user    = typeof user   !== "undefined" ? user  : "";
            ts_from = typeof ts_from!== "undefined" ? ts_from : 0;
            ts_to   = typeof ts_to  !== "undefined" ? ts_to : time;
            types   = typeof types  !== "undefined" ? types : "all";
            count   = typeof count  !== "undefined" ? count : 100;
            page    = typeof page   !== "undefined" ? page  : 1;
            var params = {
                token: token,
                user: user,
                ts_from: ts_from,
                ts_to: ts_to,
                types:types,
                count:count,
                page:page
            };
            return SlackAPI._apiCall('files.list', params, callback);
        },
        upload:function(token, file, content, filetype, filename, title, initial_comment, channels, callback){
            file        = typeof file    !== "undefined" ? file     : "";
            content     = typeof content !== "undefined" ? content  : "";
            filetype    = typeof filetype!== "undefined" ? filetype : "";
            filename    = typeof filename!== "undefined" ? filename : "";
            title       = typeof title   !== "undefined" ? title    : "";
            channels    = typeof channels!== "undefined" ? channels : "";
            initial_comment = typeof initial_comment !== "undefined" ? initial_comment : "";
            var params = {
                token: token,
                file: file,
                content: content,
                filetype: filetype,
                filename: filename,
                title: title,
                initial_comment:initial_comment,
                channels:channels
            };
            return SlackAPI._apiCall('files.upload', params, callback);
        }
    },

    // groups
    groups:{
        archive:function(token, channel, callback){
            var params = {
                token: token,
                channel: channel
            };
            return SlackAPI._apiCall('groups.archive', params, callback);
        },
        close:function(token, channel, callback){
            var params = {
                token: token,
                channel: channel
            };
            return SlackAPI._apiCall('groups.close', params, callback);
        },
        create:function(token, name, callback){
            var params = {
                token: token,
                name: name
            };
            return SlackAPI._apiCall('groups.create', params, callback);
        },
        createChild:function(token, channel, callback){
            var params = {
                token: token,
                channel:channel
            };
            return SlackAPI._apiCall('groups.createChild', params, callback);
        },
        history:function(token, channel, latest, oldest, inclusive, count, callback){
            var time = Date.now();
            latest   = typeof latest    !== "undefined" ? latest : time;
            oldest   = typeof oldest    !== "undefined" ? oldest : 0;
            inclusive= typeof inclusive !== "undefined" ? inclusive : 0;
            count    = typeof count     !== "undefined" ? count  : 100;
            var params = {
                token: token,
                channel: channel,
                latest: latest,
                oldest: oldest,
                inclusive: inclusive,
                count: count
            };
            return SlackAPI._apiCall('groups.history', params, callback);
        },
        info:function(token, channel, callback){
            var params = {
                token: token,
                channel: channel
            };
            return SlackAPI._apiCall('groups.info', params, callback);
        },
        invite:function(token, channel, user, callback){
            var params = {
                token: token,
                channel: channel,
                user:user
            };
            return SlackAPI._apiCall('groups.invite', params, callback);
        },
        kick:function(token, channel, user, callback){
            var params = {
                token: token,
                channel:channel,
                user:user
            };
            return SlackAPI._apiCall('groups.kick', params, callback);
        },
        leave:function(token, channel, callback){
            var params = {
                token: token,
                channel: channel
            };
            return SlackAPI._apiCall('groups.leave', params, callback);
        },
        list:function(token, exclude_archived, callback){
            exclude_archived = typeof exclude_archived !== "undefined" ? exclude_archived  : 0;
            var params = {
                token: token,
                exclude_archived:exclude_archived
            };
            return SlackAPI._apiCall('groups.list', params, callback);
        },
        mark:function(token, channel, ts, callback){
            var params = {
                token: token,
                channel: channel,
                ts: ts
            };
            return SlackAPI._apiCall('groups.mark', params, callback);
        },
        open:function(token, channel, callback){
            var params = {
                token: token,
                channel: channel
            };
            return SlackAPI._apiCall('groups.open', params, callback);
        },
        rename:function(token, channel, name, callback){
            var params = {
                token: token,
                channel: channel,
                name: name
            };
            return SlackAPI._apiCall('groups.rename', params, callback);
        },
        setPurpose:function(token, channel, purpose, callback){
            var params = {
                token: token,
                channel: channel,
                purpose: purpose
            };
            return SlackAPI._apiCall('groups.setPurpose', params, callback);
        },
        setTopic:function(token, channel, topic, callback){
            var params = {
                token: token,
                channel: channel,
                topic: topic
            };
            return SlackAPI._apiCall('groups.setTopic', params, callback);
        },
        unarchive:function(token, channel, callback){
            var params = {
                token: token,
                channel: channel
            };
            return SlackAPI._apiCall('groups.unarchive', params, callback);
        }
    },

    // im
    im:{
        close:function(token, channel, callback){
            var params = {
                token: token,
                channel: channel
            };
            return SlackAPI._apiCall('im.close', params, callback);
        },
        history:function(accessToken, channelId, callback){
            var params = {
                    token: accessToken,
                    channel: channelId
            }
            return SlackAPI._apiCall('im.history', params, callback);
        },
        list:function(accessToken, callback){
            var params = {
                token: accessToken,
            };
            return SlackAPI._apiCall('im.list', params, callback);
        },
        mark:function(token, channel, ts, callback){
            var params = {
                token: token,
                channel: channel,
                ts: ts
            };
            return SlackAPI._apiCall('im.mark', params, callback);
        },
        open:function(accessToken, userId, callback){
            var params = {
                token: accessToken,
                user: userId
            };
            return SlackAPI._apiCall('im.open', params, callback);
        },

    },

    // OAuth
    oauth:{
        access:function(client_id, client_secret, code, redirect_uri, callback){
            var params = {
                client_id:client_id,
                client_secret:client_secret,
                code:code,
                redirect_uri:redirect_uri
            };
            return SlackAPI._apiCall('oauth.access', params, callback);
        }
    },

    // rtm
    rtm:{
        start:function(token, callback){
            var params = {
                token: token
            };
            return SlackAPI._apiCall('rtm.start', params, callback);
        }
    },

    // search
    search:{
        all:function(token, query, sort, sort_dir, highlight, count, page, callback){
            var params = {
                token: token,
                query:query,
                sort:sort,
                sort_dir:sort_dir,
                highlight:highlight,
                count: count,
                page:page
            };
            return SlackAPI._apiCall('search.all', params, callback);
        },
        files:function(token, query, sort, sort_dir, highlight, count, page, callback){
            var params = {
                token: token,
                query:query,
                sort:sort,
                sort_dir:sort_dir,
                highlight:highlight,
                count: count,
                page:page
            };
            return SlackAPI._apiCall('search.files', params, callback);
        },
        messages:function(token, query, sort, sort_dir, highlight, count, page, callback){
            var params = {
                token: token,
                query:query,
                sort:sort,
                sort_dir:sort_dir,
                highlight:highlight,
                count: count,
                page:page
            };
            return SlackAPI._apiCall('search.messages', params, callback);
        }
    },

    // stars
    stars:{
        list:function(token, user, count, page, callback){
            user   = typeof user  !== "undefined" ? user : "";
            count  = typeof count !== "undefined" ? count  : 100;
            page   = typeof page  !== "undefined" ? page : 1;
            var params = {
                token: token,
                user: user,
                count: count,
                page: page
            };
            return SlackAPI._apiCall('stars.list', params, callback);
        }
    },

    // team
    team:{
        accessLogs:function(token, count, page, callback){
            count  = typeof count !== "undefined" ? count  : 100;
            page   = typeof page  !== "undefined" ? page : 1;
            var params = {
                token: token,
                count: count,
                page: page
            };
            return SlackAPI._apiCall('team.accessLogs', params, callback);
        },
        info:function(token, callback){
            var params = {
                token: token
            };
            return SlackAPI._apiCall('team.info', params, callback);
        }
    },

    //users
    users:{
        admin : {
            invite : function(token, email, channels, callback){
                var params = {
                    token : token,
                    email : email,
                    channels : channels
                };
                return SlackAPI._apiCall('users.admin.invite', params, callback);
            },
            setInactive : function(token, userId, callback){
                var params = {
                    token : token,
                    user : userId
                };
                return SlackAPI._apiCall('users.admin.setInactive', params, callback);
            },
            setRegular : function(token, userId, callback){
                var params = {
                    token : token,
                    user : userId
                };
                return SlackAPI._apiCall('users.admin.setRegular', params, callback);
            }
        },
        getPresence:function(token, callback){
            var params = {
                token: token
            };
            return SlackAPI._apiCall('users.getPresence', params, callback);
        },
        info:function(token, userId, callback){
            var params = {
                    token: token,
                    user: userId
            }
            return SlackAPI._apiCall('users.info', params, callback);
        },
        list:function(token, callback){
            var params = {
                token: token,
            };
            return SlackAPI._apiCall('users.list', params, callback);
        },
        setActive:function(token, callback){
            var params = {
                token: token
            };
            return SlackAPI._apiCall('users.setActive', params, callback);
        },
        setPresence:function(token, presence, callback){
            var params = {
                token: token,
                presence: presence
            };
            return SlackAPI._apiCall('users.setPresence', params, callback);
        }
    }
};
