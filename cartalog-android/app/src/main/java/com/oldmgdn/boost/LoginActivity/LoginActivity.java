package com.oldmgdn.boost.LoginActivity;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.os.CountDownTimer;
import android.text.Editable;
import android.text.TextWatcher;
import android.view.View;
import android.view.animation.Animation;
import android.view.animation.LinearInterpolator;
import android.view.animation.RotateAnimation;
import android.view.inputmethod.InputMethodManager;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.android.material.button.MaterialButton;
import com.google.android.material.textfield.TextInputEditText;
import com.google.android.material.textfield.TextInputLayout;
import com.google.firebase.FirebaseException;
import com.google.firebase.FirebaseTooManyRequestsException;
import com.google.firebase.auth.AuthResult;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthInvalidCredentialsException;
import com.google.firebase.auth.PhoneAuthCredential;
import com.google.firebase.auth.PhoneAuthProvider;
import com.oldmgdn.boost.IntroActivity.IntroActivity;
import com.oldmgdn.boost.R;

import java.util.concurrent.TimeUnit;


public class LoginActivity extends AppCompatActivity {

    private TextInputEditText activity_login_TextInputEditText1;
    private MaterialButton activity_login_MaterialButton;
    private TextInputLayout activity_login_TextInputLayout1;
    private PhoneAuthProvider.OnVerificationStateChangedCallbacks mCallbacks;
    private FirebaseAuth mAuth;
    private String phoneNumber, mVerificationId;
    private TextView registration_TextView;
    private boolean isLoggedIn = false;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        initializeUI();
        setOnClickListeners();
    }

    private void initializeUI() {
        getSupportActionBar().hide();
        mAuth = FirebaseAuth.getInstance();
        activity_login_MaterialButton = findViewById(R.id.activity_login_MaterialButton);

        mCallbacks = new PhoneAuthProvider.OnVerificationStateChangedCallbacks() {

            @Override
            public void onVerificationCompleted(PhoneAuthCredential credential) {
                signInWithPhoneAuthCredential(credential);
            }

            @Override
            public void onVerificationFailed(FirebaseException e) {

                Toast.makeText(LoginActivity.this, "Ошибка, попробуйте снова", Toast.LENGTH_SHORT).show();

                if (e instanceof FirebaseAuthInvalidCredentialsException) {

                } else if (e instanceof FirebaseTooManyRequestsException) {

                }

            }

            @Override
            public void onCodeSent(String verificationId,
                                   PhoneAuthProvider.ForceResendingToken token) {
                mVerificationId = verificationId;
            }
        };


        activity_login_TextInputLayout1 = findViewById(R.id.activity_login_TextInputLayout1);
        activity_login_TextInputEditText1 = findViewById(R.id.activity_login_TextInputEditText1);

        activity_login_TextInputEditText1.addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence s, int start, int count, int after) {

            }

            @Override
            public void onTextChanged(CharSequence s, int start, int before, int count) {

                if (activity_login_TextInputEditText1.getText().length() == 12) {
                    hideKeyboardFrom(LoginActivity.this, activity_login_TextInputEditText1);
                    phoneNumber = activity_login_TextInputEditText1.getText().toString();
                    activity_login_MaterialButton.setVisibility(View.VISIBLE);
                }

            }

            @Override
            public void afterTextChanged(Editable s) {

            }
        });


    }

    private void setOnClickListeners() {


        if (activity_login_TextInputLayout1.getVisibility() == View.VISIBLE) {
            activity_login_MaterialButton.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {

                    Toast.makeText(LoginActivity.this, R.string.wait_code, Toast.LENGTH_LONG).show();

                    activity_login_TextInputLayout1.setVisibility(View.INVISIBLE);

                    PhoneAuthProvider.getInstance().verifyPhoneNumber(phoneNumber,
                            60,
                            TimeUnit.SECONDS,
                            LoginActivity.this,
                            mCallbacks);

                    RotateAnimation rotateAnimation = new RotateAnimation(0, 360f,
                            Animation.RELATIVE_TO_SELF, 0.5f,
                            Animation.RELATIVE_TO_SELF, 0.5f);

                    rotateAnimation.setInterpolator(new LinearInterpolator());
                    rotateAnimation.setDuration(2500);
                    rotateAnimation.setRepeatCount(Animation.INFINITE);

                    activity_login_MaterialButton.setVisibility(View.INVISIBLE);

                    findViewById(R.id.activity_login_ImageView).startAnimation(rotateAnimation);

                    registration_TextView = findViewById(R.id.activity_login_TextView);

                    new CountDownTimer(45000, 1000) {

                        public void onTick(long millisUntilFinished) {

                            String remains = String.valueOf(millisUntilFinished / 1000);
                            registration_TextView.setText(remains);
                        }

                        public void onFinish() {

                            if (!isLoggedIn){
                                Toast.makeText(LoginActivity.this, getString(R.string.try_again), Toast.LENGTH_LONG).show();
                                LoginActivity.this.finish();

                                Intent intent = new Intent(LoginActivity.this, LoginActivity.class);
                                startActivity(intent);
                            }

                        }
                    }.start();


                }
            });
        } else {
            PhoneAuthCredential credential = PhoneAuthProvider.getCredential(mVerificationId, activity_login_TextInputEditText1.getText().toString());
            signInWithPhoneAuthCredential(credential);
        }
    }

    private void signInWithPhoneAuthCredential(PhoneAuthCredential credential) {
        mAuth.signInWithCredential(credential)
                .addOnCompleteListener(this, new OnCompleteListener<AuthResult>() {
                    @Override
                    public void onComplete(@NonNull Task<AuthResult> task) {
                        if (task.isSuccessful()) {

                            Intent intent = new Intent(LoginActivity.this, IntroActivity.class);
                            startActivity(intent);
                            LoginActivity.this.finish();

                            isLoggedIn = true;

                        }
                    }
                });
    }

    public static void hideKeyboardFrom(Context context, View view) {
        InputMethodManager imm = (InputMethodManager) context.getSystemService(Activity.INPUT_METHOD_SERVICE);
        imm.hideSoftInputFromWindow(view.getWindowToken(), 0);
    }

}
