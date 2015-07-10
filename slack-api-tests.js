// Write your tests here!
// Here is an example.
var token = process.env.TOKEN;
var channel1;
var group1;
var user = process.env.USER;

Tinytest.add('api', function(test){
    // make sure we hit the endpoint and it returns ok
    var result = SlackAPI.api.test({good:1});
    test.equal(result.ok, true);

    // make sure this returns not ok
    result = SlackAPI.api.test({error:"bad"});
    test.equal(result.ok, false);

});

Tinytest.addAsync('api async', function(test, done){
    // async test
    var count = 0;
    SlackAPI.api.test({good:1}, function(err,res){
        count++;
        test.equal(res.ok, true);
        if(count === 2){
            done();
        }
    });

    SlackAPI.api.test({error:"bad"}, function(err,res){
        count++;
        test.equal(err.ok,false);
        if(count === 2){
            done();
        }
    })
});


Tinytest.add('auth', function(test){
    var result = SlackAPI.auth.test(token);
    test.equal(result.ok, true);
});

Tinytest.addAsync('auth async', function(test, done){
    SlackAPI.auth.test(token, function(err,res){
        test.equal(res.ok, true);
        done();
    });
});


Tinytest.add('channels', function(test){
    // make sure that you can create a channel or that it returns the appropriate
    // response
    channel1 = SlackAPI.channels.create(token, "test-channel");
    if(channel1.ok) {
        test.equal(channel1.ok, true);
    } else {
        test.equal(channel1.error, 'name_taken');
    }

    // make sure a second channel cannot be created with the same name
    var channel2 = SlackAPI.channels.create(token, "test-channel");
    test.equal(channel2.ok,false);

    // make sure list call works
    var list = SlackAPI.channels.list(token);
    test.equal(list.ok, true);

    // in case you already created the channel before
    channel1 = _.findWhere(list.channels, {name:"test-channel"});

    // make sure history call returns ok
    var history = SlackAPI.channels.history(token, channel1.id);
    test.equal(history.ok, true);

    // make sure info call returns ok.
    var info = SlackAPI.channels.info(token, channel1.id);
    test.equal(info.ok, true);

    // make sure that invite call works
    var invite = SlackAPI.channels.invite(token, channel1.id, "user1234");
    test.equal(invite.error, 'user_not_found');

    // make sure kick call works
    var kick = SlackAPI.channels.kick(token, info.channel.id, "user1234");
    test.equal(kick.error, 'user_not_found');

    var leave = SlackAPI.channels.leave(token, channel1.id);
    test.equal(leave.ok, true);

    // make sure join call works
    var join = SlackAPI.channels.join(token, channel1.name);
    test.equal(join.ok, true);

    // make sure mark call works
    var mark = SlackAPI.channels.mark(token, channel1.id, Date.now());
    test.equal(mark.ok, true);

    var rename = SlackAPI.channels.rename(token, channel1.id, "new-test-channel");
    test.equal(rename.ok, true);

    // return the name to test channel for future testing
    rename = SlackAPI.channels.rename(token, channel1.id, "test-channel");
    test.equal(rename.ok, true);

    // make sure setPurpose call works
    var setPurpose = SlackAPI.channels.setPurpose(token, channel1.id, "testing-purpose");
    test.equal(setPurpose.ok, true);

    var setTopic = SlackAPI.channels.setTopic(token, channel1.id, "topic is testing");
    test.equal(setTopic.ok, true);

    // make sure archive call works
    var archive = SlackAPI.channels.archive(token, channel1.id);
    test.equal(archive.ok, true);

    // make sure unarchive call works
    var unarchive = SlackAPI.channels.unarchive(token, channel1.id);
    test.equal(unarchive.ok, true);
});

// Tinytest.addAsync('channesl async', function(test,done){
//     var count = 0;
//     // make sure that you can create a channel or that it returns the appropriate
//     // response
//     SlackAPI.channels.create(token, "test-channel-async", function(err,res){
//         count++;
//         if(err){
//             test.equal(err.error, 'name_taken');
//         } else {
//             test.equal(res.ok, true);
//         }
//         if(count === 15){
//             done();
//         }
//
//     });
//
//     // make sure a second channel cannot be created with the same name
//     SlackAPI.channels.create(token, "test-channel", function(err){
//         count++;
//         test.equal(err.ok,false);
//         if(count === 15) {
//             done();
//         }
//     });
//
//     // make sure list call works
//     SlackAPI.channels.list(token, function(err, res){
//         count++;
//         test.equal(res.ok, true);
//         if(count === 15){
//             done();
//         };
//
//     });
//
//     var list = SlackAPI.channels.list(token);
//     // in case you already created the channel before
//     channel1 = _.findWhere(list.channels, {name:"test-channel"});
//
//     // make sure history call returns ok
//     SlackAPI.channels.history(token, channel1.id, function(err,res){
//         count++;
//         test.equal(res.ok, true);
//         if(count === 15){
//             done();
//         };
//
//     });
//
//     // make sure info call returns ok.
//     SlackAPI.channels.info(token, channel1.id, function(err,info){
//         count++;
//         test.equal(info.ok, true);
//         // make sure kick call works
//         SlackAPI.channels.kick(token, info.channel.id, "user1234", function(err, kick){
//             count++;
//             test.equal(err.error, 'user_not_found');
//             if(count === 15){
//                 done();
//             };
//         });
//         if(count === 15){
//             done();
//         };
//
//     });
//
//     // make sure that invite call works
//     SlackAPI.channels.invite(token, channel1.id, "user1234", function(err, invite){
//         count++;
//         test.equal(err.error, 'user_not_found');
//         if(count === 15){
//             done();
//         };
//
//     });
//
//     SlackAPI.channels.leave(token, channel1.id, function(err, leave){
//         count++;
//         test.equal(leave.ok, true);
//         if(count === 15){
//             done();
//         };
//     });
//
//     // make sure join call works
//     SlackAPI.channels.join(token, channel1.name, function(err, join){
//         count++;
//         test.equal(join.ok, true);
//         if(count === 15){
//             done();
//         };
//
//     });
//
//     // make sure mark call works
//     SlackAPI.channels.mark(token, channel1.id, Date.now(), function(err, mark){
//         count++;
//         test.equal(mark.ok, true);
//         if(count === 15){
//         done();
//     };
//
//     });
//
//     SlackAPI.channels.rename(token, channel1.id, "new-test-channel", function(err, rename){
//         count++;
//         test.equal(rename.ok, true);
//         if(count === 15){
//         done();
//     };
//
//     });
//
//     // return the name to test channel for future testing
//     rename = SlackAPI.channels.rename(token, channel1.id, "test-channel");
//     test.equal(rename.ok, true);
//
//     // make sure setPurpose call works
//     SlackAPI.channels.setPurpose(token, channel1.id, "testing-purpose", function(err, setPurpose){
//         count++;
//         test.equal(setPurpose.ok, true);
//         if(count === 15){
//             done();
//         };
//
//
//     });
//
//     SlackAPI.channels.setTopic(token, channel1.id, "topic is testing", function(err, setTopic){
//         count++;
//         console.log(err);
//         test.equal(setTopic.ok, true);
//         if(count === 15){
//             done();
//         };
//     });
//
//     // make sure archive call works
//     SlackAPI.channels.archive(token, channel1.id, function(err, archive){
//         count++;
//         test.equal(archive.ok, true);
//         if(count === 15){
//             done();
//         };
//
//     });
//
//     // make sure unarchive call works
//     SlackAPI.channels.unarchive(token, channel1.id, function(err, unarchive){
//         count++;
//         test.equal(unarchive.ok, true);
//         if(count === 15){
//             done();
//         };
//     });
// })

Tinytest.add('chat', function(test){
    // make sure we can post messages
    var postMessage = SlackAPI.chat.postMessage(token, channel1.id, "test message", {});
    test.equal(postMessage.ok, true);

    // this test will vary depending on your permissions but make sure the call goes through
    var update = SlackAPI.chat.update(token, postMessage.ts, channel1.id, "new test message");
    if(update.ok){
        test.equal(update.ok, true);
    } else {
        test.equal(update.error, 'cant_update_message');
    }

    // make sure we can delete messages if we have permission
    var deletePost = SlackAPI.chat.delete(token, postMessage.ts, channel1.id);
    if(update.ok) {
        test.equal(deletePost.ok, true);
    } else {
        test.equal(deletePost.error, 'cant_delete_message');
    }
});

Tinytest.add('emoji', function(test){
    // make sure emoji list goes through
    var emoji = SlackAPI.emoji.list(token);
    test.equal(emoji.ok, true);
});

Tinytest.add('files', function(test){
    // make sure files list goes through
    var list = SlackAPI.files.list(token);
    test.equal(list.ok, true);

    // make sure the upload call goes through
    var upload = SlackAPI.files.upload(token, "test.txt");
    test.equal(upload.error, 'no_file_data');

    // make sure the info call goes through
    var info = SlackAPI.files.info(token, "test.txt");
    test.equal(info.error, "file_not_found");

    // make sure the delete
    var deleteFile = SlackAPI.files.delete(token, 'test.txt');
    test.equal(deleteFile.error, 'file_not_found');
});

Tinytest.add('groups', function(test){
    // make sure that you can create a group or that it returns the appropriate
    // response
    group1 = SlackAPI.groups.create(token, "test-group");
    if(group1.ok) {
        test.equal(group1.ok, true);
    } else {
        test.equal(group1.error, 'name_taken');
    }

    // make sure a second group cannot be created with the same name
    var group2 = SlackAPI.groups.create(token, "test-group");
    test.equal(group2.ok, false);

    // make sure the list call works
    var list = SlackAPI.groups.list(token);
    test.equal(list.ok, true);

    // reset group1 in case it returned not ok earlier
    group1 = _.findWhere(list.groups, {name:'test-group'});

    // make sure close call works
    var close = SlackAPI.groups.close(token, group1.id);
    test.equal(close.ok, true);

    // make sure open call works
    var open = SlackAPI.groups.open(token, group1.id);
    test.equal(open.ok, true);

    // make sure archive works
    var archive = SlackAPI.groups.archive(token, group1.id);
    test.equal(archive.ok, true);

    // make sure we can call unarchive
    var unarchive = SlackAPI.groups.unarchive(token, group1.id);
    test.equal(unarchive.ok, true);

    // make sure we can call the create child method
    var createChild = SlackAPI.groups.createChild(token, group1.id);
    test.equal(createChild.ok, true);

    // since we archived the other group we have to reset group1 to the active group
    group1 = createChild.group;

    // make sure we can call the history method
    var history = SlackAPI.groups.history(token, group1.id);
    test.equal(history.ok,true);

    // make sure we can call info
    var info = SlackAPI.groups.info(token, group1.id);
    test.equal(info.ok, true);

    // make sure we can call invite
    var invite = SlackAPI.groups.invite(token, group1.id, "fakeuser");
    test.equal(invite.error, "user_not_found");

    // make sure we can call kick
    var kick = SlackAPI.groups.kick(token, group1.id, "fakeuser");
    test.equal(kick.error, "user_not_found");

    // make sure we can call mark
    var mark = SlackAPI.groups.mark(token, group1.id, Date.now());
    test.equal(mark.ok, true);

    // make sure we can call rename properly
    var rename = SlackAPI.groups.rename(token, group1.id, "test-group-renamed");
    if(rename.ok){
        test.equal(rename.ok, true);
    } else {
        test.equal(rename.error, "name_taken");
    }

    // make sure that we can call setPurpose
    var setPurpose = SlackAPI.groups.setPurpose(token, group1.id, "testing-purpose");
    test.equal(setPurpose.ok, true);

    // make sure we can set the topic
    var setTopic = SlackAPI.groups.setTopic(token, group1.id, "testing topic");
    test.equal(setTopic.ok, true);

});

Tinytest.add('im', function(test){
    // make sure we can open ims
    var open = SlackAPI.im.open(token, user);
    test.equal(open.ok, true);

    // set the channel
    var channel = open.channel.id;

    // make sure we can get the history
    var history = SlackAPI.im.history(token, channel);
    test.equal(history.ok, true);

    // make sure we can call the list method
    var list = SlackAPI.im.list(token);
    test.equal(list.ok, true);

    // make sure we can mark the channel
    var mark = SlackAPI.im.mark(token, channel, Date.now());
    test.equal(mark.ok, true);

    // make sure we can close the channel
    var close = SlackAPI.im.close(token, channel);
    test.equal(close.ok, true);
});


Tinytest.add('oauth', function(test){
    // make sure we can call the oauth method
    var access = SlackAPI.oauth.access("client", "secret", "code", "redirect");
    test.equal(access.error, "invalid_client_id");
});


Tinytest.add('rtm', function(test){
    // make sure we can call the rtm.start method
    var start = SlackAPI.rtm.start(token);
    test.equal(start.ok,true);
});

Tinytest.add('search', function(test){
    // make sure we can search all
    var all = SlackAPI.search.all(token, true);
    test.equal(all.ok, true);

    // make sure we can search files
    var files = SlackAPI.search.files(token, true);
    test.equal(files.ok, true);

    // make sure we can search messages
    var messages = SlackAPI.search.messages(token, true);
    test.equal(messages.ok, true);
});

Tinytest.add('stars', function(test){
    // make sure we can list the stars
    var list = SlackAPI.stars.list(token);
    test.equal(list.ok, true);
});


Tinytest.add('team', function(test){
    // make sure we can call accessLogs
    var accessLogs = SlackAPI.team.accessLogs(token);
    if(accessLogs.ok){
        test.equal(accessLogs.ok, true);
    } else {
        test.equal(accessLogs.error, 'missing_scope');
    }

    // make sure we can call info
    var info = SlackAPI.team.info(token);
    test.equal(info.ok, true);
});


Tinytest.add('users', function(test){
    // make sure we can get presence
    var getPresence = SlackAPI.users.getPresence(token);
    test.equal(getPresence.ok, true);

    // make sure we can get info
    var info = SlackAPI.users.info(token, "user");
    test.equal(info.error, 'user_not_found');

    // make sure we can list members
    var list = SlackAPI.users.list(token);
    test.equal(list.ok, true);

    // make sure we can set active
    var setActive = SlackAPI.users.setActive(token);
    test.equal(setActive.ok, true);

    var setPresence = SlackAPI.users.setPresence(token, "auto");
    test.equal(setPresence.ok, true);
});

function isDone(count, target){
    if(count === target) {
        done();
    }
}
