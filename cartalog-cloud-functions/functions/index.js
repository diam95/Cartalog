const functions = require('firebase-functions');

Object.defineProperty(exports, "__esModule", {value: true});

const admin = require("firebase-admin");

admin.initializeApp();

exports.messageCount = functions.database
    .ref(`messages/{city}/{requestType}/{requestKey}/`)
    .onWrite((change, context) => {

        const allPromises = [];

        if (change.after.hasChildren()) {

            allPromises.push(admin.database().ref(`requests`).child(context.params.city).child(context.params.requestType)
                .child(context.params.requestKey).child(`offersCount`).set(change.after.numChildren()));

        }

        return Promise.all(allPromises);
    });

exports.lastMessageTimestamp = functions.database
    .ref(`messages/{city}/{requestType}/{requestKey}/{vendorID}/{messageKey}`)
    .onWrite((change, context) => {

        const allPromises = [];

        const partners2AnsweredRequestsRef = admin.database().ref(`partners2`)
            .child(context.params.vendorID).child(`answeredRequests`).child(context.params.requestKey)

        allPromises.push(partners2AnsweredRequestsRef.set(admin.database.ServerValue.TIMESTAMP))

        return Promise.all(allPromises)

    })

exports.messageCountForVendors = functions.database
    .ref(`messages/{city}/{requestType}/{requestKey}/{vendorID}/{messageKey}`)
    .onWrite((change, context) => {

        const allPromises = [];

        console.log(change.after.child(`newWebMessage`).val())

        if (change.after.val().newWebMessage === 1) {

            const partners2RefLastMessage = admin.database().ref(`partners2`).child(context.params.vendorID).child(`lastMessage`);
            allPromises.push(partners2RefLastMessage.remove())
            allPromises.push(partners2RefLastMessage.set(change.after.val()))

            const partners2RefNewMessageRef = admin.database().ref(`partners2`)
                .child(context.params.vendorID).child(`newMessages`).child(context.params.requestKey)

            allPromises.push(partners2RefNewMessageRef.once(`value`, snap => {

                if (snap.exists()) {
                    const newMessagesCount = snap.val() + 1;
                    partners2RefNewMessageRef.set(newMessagesCount);
                } else {
                    const newMessagesCount = 1;
                    partners2RefNewMessageRef.set(newMessagesCount);
                }


            }))

        }

        return Promise.all(allPromises);

    });

exports.deleteAnsweredRequests = functions.database.ref(`messages/{city}/{requestType}/{requestKey}/{vendorID}`).onDelete((snapshot, context) => {

    const allPromises = [];
    const infoRef = admin.database().ref(`partners2`).child(context.params.vendorID).child(`answeredRequests`).child(context.params.requestKey);

    allPromises.push(
        infoRef.remove()
    );

    return Promise.all(allPromises);


})

exports.sendNewNotification = functions.database
    .ref(`messages/{city}/{requestType}/{requestKey}/{vendorID}/{messageKey}`)
    .onCreate((snapshot, context) => {

        if (snapshot.child("viewType").val() === 0 || snapshot.child("viewType").val() === 1) {

            const vendorID = context.params.vendorID;
            const userID = snapshot.child(`userID`).val();
            const message = snapshot.child(`message`).val().toString();

            const city = context.params.city;
            const requestType = context.params.requestType;
            const requestKey = context.params.requestKey;

            var vendorName;
            var requestObject;

            const requestRef = admin.database().ref(`requests/${city}/${requestType}`).orderByKey().equalTo(requestKey)
                .once(`child_added`, (requestSnap) => {

                    requestObject = requestSnap.val();

                })

            const partnersRef = admin.database().ref(`partners/${city}/${requestType}/${vendorID}/name`)
                .once(`value`, (partnerSnap) => {

                    vendorName = partnerSnap.val().toString();

                })

            const ref = admin.database().ref(`users/${userID}/messagingToken`);

            return ref.once("value", (snapshot) => {

                console.log("send message to: " + snapshot.val())

                const payload = {
                    data: {
                        title: vendorName,
                        body: message,
                        VIN: requestObject.VIN,
                        description: requestObject.description,
                        key: requestObject.key,
                        make: requestObject.make,
                        model: requestObject.model,
                        offersCount: requestObject.offersCount.toString(),
                        timestamp: requestObject.timestamp.toString(),
                        type: requestObject.type,
                        userID: requestObject.userID,
                        year: requestObject.year,
                        city: city,
                        vendorID: vendorID,
                    },
                    notification: {
                        title: requestObject.make + ` ` + requestObject.model + `. ` + requestObject.description,
                        body: message
                    }
                };

                admin.messaging().sendToDevice(snapshot.val(), payload, {
                    contentAvailable: true,
                    priority: "high"
                })

            }, (errorObject) => {
                console.log("The read failed: " + errorObject.code);
            });

        }

    });

exports.requestAdded = functions.database
    .ref(`requests/{city}/{type}/{requestKey}`)
    .onCreate((snapshot, context) => {

        const allPromises = [];
        const infoRef = admin.database().ref(`info`).child(context.params.city).child(context.params.type).child(`totalRequests`);

        if (snapshot.exists()) {

            infoRef.once(`value`, snap => {

                const count = snap.val();

                allPromises.push(
                    infoRef.set(count + 1)
                );

            })

        }

        return Promise.all(allPromises);

    });

exports.requestDeleted = functions.database
    .ref(`requests/{city}/{type}/{requestKey}`)
    .onDelete((snapshot, context) => {

        const allPromises = [];
        const infoRef = admin.database().ref(`info`).child(context.params.city).child(context.params.type).child(`totalRequests`);

        infoRef.once(`value`, snap => {

            const count = snap.val();

            allPromises.push(
                infoRef.set(count - 1)
            );


        });

        const deletedRequestsRef = admin.database().ref(`deletedRequests/${context.params.city}/${context.params.type}/${context.params.requestKey}`)
        allPromises.push(deletedRequestsRef.set(snapshot.val()))

        return Promise.all(allPromises);

    });

exports.countAnsweredRequests1 = functions.database
    .ref(`partners2/{vendorID}/answeredRequests/{requestKey}/`)
    .onCreate((snapshot, context) => {

        const allPromises = [];

        const infoRef = admin.database().ref(`partners2`).child(context.params.vendorID).child(`myAnswersCount`);

        infoRef.once(`value`, snap => {

            const count = snap.val();

            allPromises.push(
                infoRef.set(count + 1)
            );

        })

        return Promise.all(allPromises);

    });

exports.countAnsweredRequests2 = functions.database
    .ref(`partners2/{vendorID}/answeredRequests/{requestKey}/`)
    .onDelete((snapshot, context) => {

        const allPromises = [];

        const infoRef = admin.database().ref(`partners2`).child(context.params.vendorID).child(`myAnswersCount`);

        infoRef.once(`value`, snap => {

            const count = snap.val();

            allPromises.push(
                infoRef.set(count - 1)
            );

        })

        return Promise.all(allPromises);

    });

exports.getPhoneNumber = functions.https.onCall((data, context) => {

    return admin.auth().getUser(data.userID)
        .then(userRecord => {
            const phoneNumber = userRecord.phoneNumber;
            return {phoneNumber: phoneNumber}
        })

});