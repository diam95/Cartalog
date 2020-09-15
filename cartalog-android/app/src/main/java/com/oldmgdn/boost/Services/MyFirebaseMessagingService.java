package com.oldmgdn.boost.Services;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Build;

import androidx.annotation.NonNull;
import androidx.core.app.NotificationCompat;
import androidx.core.app.NotificationManagerCompat;

import com.google.firebase.messaging.FirebaseMessagingService;
import com.google.firebase.messaging.RemoteMessage;
import com.oldmgdn.boost.ChatWithVendor.ChatWithVendorActivity;
import com.oldmgdn.boost.Objects.RequestObject;
import com.oldmgdn.boost.R;

import java.util.Random;

public class MyFirebaseMessagingService extends FirebaseMessagingService {

    private static final String CHANNEL_ID = "fa32f93faskr30flzkvsv0rs0k";

    public MyFirebaseMessagingService() {

    }

    @Override
    public void onNewToken(@NonNull String s) {
        super.onNewToken(s);
    }

    @Override
    public void onMessageReceived(RemoteMessage remoteMessage) {

        SharedPreferences sharedPreferences = getApplicationContext().getSharedPreferences("notificationStatus",Context.MODE_PRIVATE);

        if (sharedPreferences.contains(getString(R.string.notifications_on))){

            if (sharedPreferences.getBoolean(getString(R.string.notifications_on),false)){

                buildNotification(remoteMessage);

            }

        } else {

            buildNotification(remoteMessage);

        }


    }

    private void buildNotification(RemoteMessage remoteMessage) {


        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            CharSequence name = getString(R.string.name);
            String description = getString(R.string.descr);
            int importance = NotificationManager.IMPORTANCE_DEFAULT;
            NotificationChannel channel = new NotificationChannel(CHANNEL_ID, name, importance);
            channel.setDescription(description);
            // Register the channel with the system; you can't change the importance
            // or other notification behaviors after this
            NotificationManager notificationManager = getSystemService(NotificationManager.class);
            notificationManager.createNotificationChannel(channel);
        }

        RequestObject requestObject = new RequestObject(
                remoteMessage.getData().get("make"), remoteMessage.getData().get("model"), remoteMessage.getData().get("VIN"),
                remoteMessage.getData().get("year"), remoteMessage.getData().get("description"),
                remoteMessage.getData().get("type"), remoteMessage.getData().get("userID"), remoteMessage.getData().get("key"),
                Long.valueOf(remoteMessage.getData().get("timestamp")), Integer.valueOf(remoteMessage.getData().get("offersCount"))
        );

        // Create an explicit intent for an Activity in your app
        Intent intent = new Intent(this, ChatWithVendorActivity.class);
        intent.putExtra("city", remoteMessage.getData().get("city"));
        intent.putExtra("make", requestObject.make);
        intent.putExtra("model", requestObject.model);
        intent.putExtra("VIN", requestObject.VIN);
        intent.putExtra("year", requestObject.year);
        intent.putExtra("description", requestObject.description);
        intent.putExtra("timestamp", requestObject.timestamp);
        intent.putExtra("type", requestObject.type);
        intent.putExtra("userID", requestObject.userID);
        intent.putExtra("key", requestObject.key);
        intent.putExtra("timestamp", requestObject.timestamp);
        intent.putExtra("offersCount", requestObject.offersCount);
        intent.putExtra("vendorID", remoteMessage.getData().get("vendorID"));
        intent.putExtra("vendorName", remoteMessage.getData().get("title"));
        intent.putExtra("fromNotification", 1);
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);

        Random r = new Random();

        PendingIntent pendingIntent = PendingIntent.getActivity(this, r.nextInt(999), intent, PendingIntent.FLAG_UPDATE_CURRENT);

        NotificationCompat.Builder builder = new NotificationCompat.Builder(this, CHANNEL_ID)
                .setSmallIcon(R.drawable.ic_logo)
                .setContentTitle(remoteMessage.getData().get("title"))
                .setContentText(remoteMessage.getData().get("body"))
                .setPriority(NotificationCompat.PRIORITY_DEFAULT)
                .setContentIntent(pendingIntent)
                .setAutoCancel(true)
                .setStyle(new NotificationCompat.BigTextStyle()
                        .bigText(remoteMessage.getData().get("title") + " в ответ на заявку " + requestObject.make + " "
                                + requestObject.model + ", " + requestObject.description))
                .setDefaults(Notification.DEFAULT_ALL);

        NotificationManagerCompat notificationManager = NotificationManagerCompat.from(this);


        // notificationId is a unique int for each notification that you must define
        notificationManager.notify(r.nextInt(999), builder.build());

    }

}


