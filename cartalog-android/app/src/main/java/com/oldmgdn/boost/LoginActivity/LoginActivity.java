package com.oldmgdn.boost.LoginActivity;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.text.Editable;
import android.text.TextWatcher;
import android.view.View;
import android.view.inputmethod.InputMethodManager;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.coordinatorlayout.widget.CoordinatorLayout;

import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.android.material.button.MaterialButton;
import com.google.android.material.snackbar.Snackbar;
import com.google.android.material.textfield.TextInputEditText;
import com.google.android.material.textfield.TextInputLayout;
import com.google.firebase.FirebaseException;
import com.google.firebase.FirebaseTooManyRequestsException;
import com.google.firebase.auth.AuthResult;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthInvalidCredentialsException;
import com.google.firebase.auth.PhoneAuthCredential;
import com.google.firebase.auth.PhoneAuthProvider;
import com.oldmgdn.boost.MainActivity.MainActivity;
import com.oldmgdn.boost.R;

import java.util.concurrent.TimeUnit;


public class LoginActivity extends AppCompatActivity {

    private TextInputEditText activity_login_TextInputEditText1;
    private MaterialButton activity_login_MaterialButton;
    private TextInputLayout activity_login_TextInputLayout1;
    private PhoneAuthProvider.OnVerificationStateChangedCallbacks mCallbacks;
    private FirebaseAuth mAuth;
    private String phoneNumber, mVerificationId;
    private CoordinatorLayout coordinatorLayout;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        initializeUI();
        setOnClickListeners();

        Snackbar.make(coordinatorLayout, R.string.registration, Snackbar.LENGTH_LONG).show();

    }

    private void initializeUI() {
        getSupportActionBar().hide();
        mAuth = FirebaseAuth.getInstance();
        activity_login_MaterialButton = findViewById(R.id.activity_login_MaterialButton);

        coordinatorLayout = findViewById(R.id.loginActivityCoordinatorLayout);

        mCallbacks = new PhoneAuthProvider.OnVerificationStateChangedCallbacks() {

            @Override
            public void onVerificationCompleted(PhoneAuthCredential credential) {
                signInWithPhoneAuthCredential(credential);
            }

            @Override
            public void onVerificationFailed(FirebaseException e) {

                Snackbar.make(coordinatorLayout, R.string.Error, Snackbar.LENGTH_LONG).show();

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

                    Snackbar.make(coordinatorLayout, R.string.pressOk, Snackbar.LENGTH_LONG).show();

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

                    Snackbar.make(coordinatorLayout, R.string.wait_code, Snackbar.LENGTH_LONG).show();

                    PhoneAuthProvider.getInstance().verifyPhoneNumber(phoneNumber,
                            60,
                            TimeUnit.SECONDS,
                            LoginActivity.this,
                            mCallbacks);

                    activity_login_TextInputEditText1.setText("");
                    activity_login_TextInputEditText1.setHint("Введите код из СМС");

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

                            Intent intent = new Intent(LoginActivity.this, MainActivity.class);
                            startActivity(intent);
                            LoginActivity.this.finish();

                        }
                    }
                });
    }

    public static void hideKeyboardFrom(Context context, View view) {
        InputMethodManager imm = (InputMethodManager) context.getSystemService(Activity.INPUT_METHOD_SERVICE);
        imm.hideSoftInputFromWindow(view.getWindowToken(), 0);
    }

}
