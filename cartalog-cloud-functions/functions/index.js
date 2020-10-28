const functions = require('firebase-functions');
const puppeteer = require('puppeteer');

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

exports.messageCountForVendors = functions.database
    .ref(`messages/{city}/{requestType}/{requestKey}/{vendorID}/{messageKey}`)
    .onWrite((change, context) => {

        const allPromises = [];

        const partners2AnsweredRequestsRef = admin.database().ref(`partners2`)
            .child(context.params.vendorID).child(`answeredRequests`).child(context.params.requestKey)
        allPromises.push(partners2AnsweredRequestsRef.set(admin.database.ServerValue.TIMESTAMP))


        if (change.after.val().newWebMessage === 1) {

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

exports.sendNewNotification = functions.database
    .ref(`messages/{city}/{requestType}/{requestKey}/{vendorID}/{messageKey}`)
    .onCreate((snapshot, context) => {

        if (snapshot.child("viewType").val() === 0 || snapshot.child("viewType").val() === 1) {

            const vendorID = context.params.vendorID;
            const requestType = context.params.requestType;
            const requestKey = context.params.requestKey;
            const userID = snapshot.child(`userID`).val();
            const message = snapshot.child(`message`).val().toString();

            const city = context.params.city;

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

exports.requestDeleted = functions.database
    .ref(`requests/{city}/{type}/{requestKey}`)
    .onDelete((snapshot, context) => {

        const allPromises = [];

        const deletedRequestsRef = admin.database().ref(`deletedRequests/${context.params.city}/${context.params.type}/${context.params.requestKey}`)
        allPromises.push(deletedRequestsRef.set(snapshot.val()))

        const newMessagesRef = admin.database().ref("partners2").child("SDax1yMalBTrlGdhrbHWheNpSLE2").child("newMessages").child(context.params.requestKey)
        allPromises.push(newMessagesRef.remove())

        return Promise.all(allPromises);

    });

exports.getPhoneNumber = functions.https.onCall((data, context) => {

    return admin.auth().getUser(data.userID)
        .then(userRecord => {
            const phoneNumber = userRecord.phoneNumber;
            return {phoneNumber: phoneNumber}
        })

});

exports.getCarBrandsAndModels = functions.runWith({memory: '1GB'}).https.onCall(async (data, context) => {

    const URL = data.URL

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(URL);

    const carBrands = await page.evaluate(() => {

        const result = {
            brands: {},
            models: {}
        }

        Array.from(document
            .querySelectorAll("div.search-flex div.search-flex_cell ul.search-main li.search-main_item a.search-main__link"))
            .forEach((brand, id) => {

                if (brand.href.split("/").length === 5) {
                    const text = brand.innerText.trim().toUpperCase()
                    result["brands"][`${text}`] = id
                } else {
                    const brandName = brand.href.split("/")[3]

                    const model = brand.innerText.trim()
                    const model2 = model.split('.').join("").toUpperCase()

                    if (result["models"][`${brandName}`]) {
                        result["models"][`${brandName}`][model2] = id
                    } else {
                        result["models"][`${brandName}`] = {}
                        result["models"][`${brandName}`][model2] = id
                    }

                }

            })

        return result

    });

    await browser.close();

    return carBrands

});

exports.getCarParts = functions.runWith({memory: '1GB'}).https.onCall(async (data, context) => {

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const URL = "https://1000zp.ru/" + data.URL

    console.log({URL})


    await page.goto(URL);

    const imageSrcs = await page.evaluate(() => {

        return Array.from(document.querySelectorAll("div.pads-box_image img")).map(image => {
            return image.src
        })

    });

    const titles = await page.evaluate(() => {

        return Array.from(document.querySelectorAll("div.pads-box__layout a")).map(title => {
            return title.innerText.trim()
        })

    });

    const prices = await page.evaluate(() => {

        return Array.from(document.querySelectorAll("span.pads-box__cost")).map(price => {
            return price.innerText.trim()
        })

    });

    const result = titles.map((title,id)=>{

        return({
            imageSrc: imageSrcs[id],
            title: titles[id],
            price: prices[id]
        })

    })

    await browser.close();

    return result

});