package com.oldmgdn.thisapplication.ServiceActivity;

import android.app.ProgressDialog;
import android.content.DialogInterface;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.drawable.Drawable;
import android.net.Uri;
import android.provider.MediaStore;
import android.support.annotation.NonNull;
import android.support.v7.app.AlertDialog;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.CardView;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import com.oldmgdn.thisapplication.AutoActivity.AddAutoActivity;
import com.oldmgdn.thisapplication.MainActivity.MainActivity;
import com.oldmgdn.thisapplication.R;
import com.oldmgdn.thisapplication.ServiceActivity.helpers.CarChooser;
import com.google.android.gms.tasks.Continuation;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ServerValue;
import com.google.firebase.iid.FirebaseInstanceId;
import com.google.firebase.iid.InstanceIdResult;
import com.google.firebase.storage.FirebaseStorage;
import com.google.firebase.storage.StorageReference;
import com.google.firebase.storage.UploadTask;
import com.squareup.picasso.Picasso;

import java.io.IOException;

import de.hdodenhof.circleimageview.CircleImageView;

import static com.oldmgdn.thisapplication.MainActivity.MainActivity.checkInternetConnection;

public class ServiceActivity extends AppCompatActivity {

    private Button button_service_activity_back, service_activity_button_OK;
    private CardView service_activity_cardView_choose;
    private static final int PICK_IMAGE_REQUEST = 1;
    private CircleImageView service_activity_imageView_gallery_intent;
    private ImageView service_activity_imageView_ic_delete;
    private Uri image_link;
    private Drawable image;
    private String manufacturer, model, year, VIN, imagee, description, key;
    private TextView service_activity_editText_details, service_activity_textView_choose_auto;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_service);

        initializeUI();

        setOnClickListeners();

        getIntentData();

        cardView();

    }

    private void getIntentData() {

        Intent intent = getIntent();

        manufacturer = intent.getStringExtra("manufacturer");
        model = intent.getStringExtra("model");
        year = intent.getStringExtra("year");
        VIN = intent.getStringExtra("VIN");
        description = intent.getStringExtra("description");
        imagee = intent.getStringExtra("image");
        key = intent.getStringExtra("key");

    }

    private void setOnClickListeners() {

        button_service_activity_back.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(ServiceActivity.this, MainActivity.class);
                startActivity(intent);
            }
        });

        service_activity_cardView_choose.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(ServiceActivity.this, CarChooser.class);
                intent.putExtra("description", description);
                intent.putExtra("image", imagee);
                intent.putExtra("key", key);
                startActivity(intent);
            }
        });

        service_activity_imageView_ic_delete.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                service_activity_imageView_gallery_intent.setImageBitmap(null);
                service_activity_imageView_gallery_intent.setBackground(image);
                image_link = null;
                service_activity_imageView_ic_delete.setVisibility(View.INVISIBLE);
            }
        });

        service_activity_imageView_gallery_intent.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent();
                intent.setType("image/*");
                intent.setAction(Intent.ACTION_GET_CONTENT);
                startActivityForResult(Intent.createChooser(intent, "Select Picture"), PICK_IMAGE_REQUEST);
            }
        });

        service_activity_button_OK.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                ProgressDialog progress = new ProgressDialog(ServiceActivity.this);
                progress.show();

                if (checkInternetConnection(getApplicationContext())) {

                    if (service_activity_editText_details.getText().length() != 0 && model != null) {
                        FirebaseAuth mAuth = FirebaseAuth.getInstance();
                        FirebaseDatabase database = FirebaseDatabase.getInstance();
                        FirebaseStorage storage = FirebaseStorage.getInstance();
                        if (key == null) {
                            final DatabaseReference myRef = database.getReference("service").child(mAuth.getUid()).push();
                            final StorageReference storageRef = storage.getReference("service").child(mAuth.getCurrentUser().getUid()).child(myRef.getKey());
                            myRef.child("marka").setValue(manufacturer);

                            FirebaseInstanceId.getInstance().getInstanceId().addOnCompleteListener(new OnCompleteListener<InstanceIdResult>() {
                                @Override
                                public void onComplete(@NonNull Task<InstanceIdResult> task) {
                                    String deviceToken = task.getResult().getToken();
                                    myRef.child("device_token").setValue(deviceToken);
                                }
                            });


                            if (image_link != null & myRef.getKey() != null) {
                                storageRef.putFile(image_link).continueWithTask(new Continuation<UploadTask.TaskSnapshot, Task<Uri>>() {
                                    @Override
                                    public Task<Uri> then(@NonNull Task<UploadTask.TaskSnapshot> task) throws Exception {
                                        if (!task.isSuccessful()) {
                                            throw task.getException();
                                        }
                                        return storageRef.getDownloadUrl();
                                    }
                                }).addOnCompleteListener(new OnCompleteListener<Uri>() {
                                    @Override
                                    public void onComplete(@NonNull Task<Uri> task) {
                                        if (task.isSuccessful()) {
                                            Uri downloadUri = task.getResult();
                                            myRef.child("image").setValue(downloadUri.toString());
                                        } else {
                                            Toast.makeText(ServiceActivity.this, "Ошибка загрузки... " + task.getException().getMessage(), Toast.LENGTH_SHORT).show();
                                        }
                                    }
                                });
                            }

                            myRef.child("Time").setValue(ServerValue.TIMESTAMP);
                            myRef.child("model").setValue(model);
                            myRef.child("year").setValue(year);
                            myRef.child("VIN").setValue(VIN);
                            myRef.child("type").setValue("service");
                            myRef.child("key").setValue(myRef.getKey());
                            myRef.child("description").setValue(service_activity_editText_details.getText().toString());
                            myRef.child("user").setValue(mAuth.getCurrentUser().getUid()).addOnCompleteListener(new OnCompleteListener<Void>() {
                                @Override
                                public void onComplete(@NonNull Task<Void> task) {
                                    progress.dismiss();
                                    Intent intent = new Intent(ServiceActivity.this, MainActivity.class);
                                    finish();
                                    startActivity(intent);
                                }
                            });

                        } else {

                            final DatabaseReference myRef = database.getReference("service").child(mAuth.getCurrentUser().getUid()).child(key);
                            final StorageReference storageRef = storage.getReference("service").child(mAuth.getCurrentUser().getUid()).child(key);

                            DatabaseReference notificationsRef = database.getReference("notifications").child(mAuth.getUid()).child(key);
                            notificationsRef.removeValue();

                            DatabaseReference offersRef = database.getReference("offers").child(mAuth.getUid()).child(key);
                            offersRef.removeValue();

                            myRef.child("offers_count").removeValue();

                            myRef.child("marka").setValue(manufacturer);
                            if (image_link != null & myRef.getKey() != null) {
                                storageRef.putFile(image_link).continueWithTask(new Continuation<UploadTask.TaskSnapshot, Task<Uri>>() {
                                    @Override
                                    public Task<Uri> then(@NonNull Task<UploadTask.TaskSnapshot> task) throws Exception {
                                        if (!task.isSuccessful()) {
                                            throw task.getException();
                                        }
                                        return storageRef.getDownloadUrl();
                                    }
                                }).addOnCompleteListener(new OnCompleteListener<Uri>() {
                                    @Override
                                    public void onComplete(@NonNull Task<Uri> task) {
                                        if (task.isSuccessful()) {
                                            Uri downloadUri = task.getResult();
                                            myRef.child("image").setValue(downloadUri.toString());
                                        } else {
                                            Toast.makeText(ServiceActivity.this, "Ошибка загрузки... " + task.getException().getMessage(), Toast.LENGTH_SHORT).show();
                                        }
                                    }
                                });
                            }

                            myRef.child("Time").setValue(ServerValue.TIMESTAMP);
                            myRef.child("model").setValue(model);
                            myRef.child("year").setValue(year);
                            myRef.child("VIN").setValue(VIN);
                            myRef.child("key").setValue(myRef.getKey());
                            myRef.child("description").setValue(service_activity_editText_details.getText().toString());
                            myRef.child("user").setValue(mAuth.getCurrentUser().getUid()).addOnCompleteListener(new OnCompleteListener<Void>() {
                                @Override
                                public void onComplete(@NonNull Task<Void> task) {
                                    progress.dismiss();
                                    Intent intent = new Intent(ServiceActivity.this, MainActivity.class);
                                    finish();
                                    startActivity(intent);
                                }
                            });
                        }
                    } else {
                        Toast.makeText(ServiceActivity.this, "Заполните заявку", Toast.LENGTH_SHORT).show();
                    }
                } else {

                    runOnUiThread(new Runnable() {
                        @Override
                        public void run() {

                            if (!isFinishing()) {
                                new AlertDialog.Builder(ServiceActivity.this)
                                        .setTitle("Подключите интернет!")
                                        .setMessage("Отсутствует подключение к интернету.")
                                        .setCancelable(false)
                                        .setPositiveButton("ok", new DialogInterface.OnClickListener() {
                                            @Override
                                            public void onClick(DialogInterface dialog, int which) {
                                                Intent intent = getIntent();
                                                intent.putExtra("manufacturer", manufacturer);
                                                intent.putExtra("model", model);
                                                intent.putExtra("VIN", VIN);
                                                intent.putExtra("year", year);
                                                intent.putExtra("description", description);
                                                intent.putExtra("image", imagee);
                                                if (key != null) {
                                                    intent.putExtra("key", key);
                                                }

                                                finish();
                                                startActivity(intent);
                                            }
                                        }).show();
                            }
                        }
                    });

                }
            }
        });


    }


    private void initializeUI() {


        service_activity_button_OK = findViewById(R.id.service_activity_button_OK);
        image = getResources().getDrawable(R.drawable.ic_camera);
        service_activity_cardView_choose = findViewById(R.id.service_activity_cardView_choose);
        button_service_activity_back = findViewById(R.id.button_service_activity_back);
        service_activity_imageView_gallery_intent = findViewById(R.id.service_activity_imageView_gallery_intent);
        service_activity_imageView_ic_delete = findViewById(R.id.service_activity_imageView_ic_delete);
        service_activity_editText_details = findViewById(R.id.service_activity_editText_details);
        service_activity_textView_choose_auto = findViewById(R.id.service_activity_textView_choose_auto);

    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);

        if (requestCode == PICK_IMAGE_REQUEST && resultCode == RESULT_OK && data != null && data.getData() != null) {

            Uri uri = data.getData();

            try {

                Bitmap bitmap = MediaStore.Images.Media.getBitmap(getContentResolver(), uri);

                image_link = uri;
                //Toast.makeText(AddAutoActivity.this,image,Toast.LENGTH_SHORT).show();
                service_activity_imageView_gallery_intent.setBackground(null);
                service_activity_imageView_gallery_intent.setImageBitmap(bitmap);
                service_activity_imageView_ic_delete.setVisibility(View.VISIBLE);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    public void cardView() {
        if (manufacturer == null | model == null | year == null | VIN == "") {
        } else {
            // Toast.makeText(AddAutoActivity.this, manufacturer + model + year + VIN, Toast.LENGTH_SHORT).show();
            Picasso.get().load(imagee).into(service_activity_imageView_gallery_intent);
            service_activity_editText_details.setText(description);
            service_activity_textView_choose_auto.setText("Автомобиль: " + manufacturer + ", " + model + "\n" + "Год: " + year + "\n" + "VIN: " + VIN);
        }
    }

}
