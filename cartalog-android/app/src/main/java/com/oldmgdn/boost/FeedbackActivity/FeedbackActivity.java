package com.oldmgdn.boost.FeedbackActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.ImageButton;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.android.material.textfield.TextInputEditText;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.oldmgdn.boost.Objects.FeedbackObject;
import com.oldmgdn.boost.R;

import java.util.Date;

public class FeedbackActivity extends AppCompatActivity {


    public ImageButton back;
    public Button ok_Button;
    public String city;
    public TextView back_TextView;
    public TextInputEditText message_EditText;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_feedback);

        initializeUI();
        setOnClickListeners();
    }

    private void setOnClickListeners() {

        back.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                FeedbackActivity.this.finish();
            }
        });

        back_TextView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                FeedbackActivity.this.finish();
            }
        });

        ok_Button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                if (message_EditText.getText().length() != 0) {
                    FirebaseDatabase database = FirebaseDatabase.getInstance();
                    FirebaseAuth mAuth = FirebaseAuth.getInstance();
                    DatabaseReference dbRef = database.getReference("feedback").child(city).child(mAuth.getUid()).push();

                    String message = message_EditText.getText().toString();
                    String userID = mAuth.getUid();

                    Long timeOffset = getSharedPreferences(getString(R.string.timeOffset), MODE_PRIVATE).getLong(getString(R.string.timeOffset),0);
                    Long timestamp = new Date().getTime() - timeOffset;

                    FeedbackObject feedbackObject = new FeedbackObject(message, userID, timestamp);

                    dbRef.setValue(feedbackObject).addOnCompleteListener(new OnCompleteListener<Void>() {
                        @Override
                        public void onComplete(@NonNull Task<Void> task) {

                            Intent intent=new Intent();
                            setResult(3,intent);
                            FeedbackActivity.this.finish();
                        }
                    });
                }

            }
        });
    }

    private void initializeUI() {

        getSupportActionBar().hide();
        back = findViewById(R.id.activity_feedback_back_ImageButton);
        ok_Button = findViewById(R.id.activity_feedback_ok_Button);
        back_TextView = findViewById(R.id.activity_feedback_back_TextView);
        message_EditText = findViewById(R.id.activity_feedback_TextInputEditText);

        city = getIntent().getStringExtra("city");
    }
}
