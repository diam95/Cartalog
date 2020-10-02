package com.oldmgdn.boost.LoginActivity;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.text.Editable;
import android.text.TextWatcher;
import android.view.View;
import android.view.inputmethod.InputMethodManager;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.coordinatorlayout.widget.CoordinatorLayout;
import androidx.core.widget.ContentLoadingProgressBar;

import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.android.material.button.MaterialButton;
import com.google.android.material.snackbar.Snackbar;
import com.google.android.material.textfield.TextInputEditText;
import com.google.android.material.textfield.TextInputLayout;
import com.google.firebase.FirebaseException;
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
    private CoordinatorLayout coordinatorLayout;
    private ContentLoadingProgressBar progressBar;

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

        phoneNumber="";

        progressBar = findViewById(R.id.loginActivityCircularProgress);
        progressBar.setVisibility(View.INVISIBLE);

        activity_login_MaterialButton = findViewById(R.id.activity_login_MaterialButton);

        coordinatorLayout = findViewById(R.id.loginActivityCoordinatorLayout);

        mCallbacks = new PhoneAuthProvider.OnVerificationStateChangedCallbacks() {

            @Override
            public void onVerificationCompleted(PhoneAuthCredential credential) {
                signInWithPhoneAuthCredential(credential);
            }

            @Override
            public void onVerificationFailed(FirebaseException e) {

                Snackbar.make(coordinatorLayout, R.string.Error, Snackbar.LENGTH_LONG)
                        .setBackgroundTint(getColor(R.color.dark_grey2)).setTextColor(getColor(R.color.white)).show();

                new Handler(Looper.getMainLooper()).postDelayed(new Runnable() {
                    @Override
                    public void run() {
                        activity_login_TextInputEditText1.setText("+7");
                        activity_login_TextInputEditText1.setSelection(2);
                        LoginActivity.this.recreate();
                    }
                }, 3000);

            }

            @Override
            public void onCodeSent(String verificationId,
                                   PhoneAuthProvider.ForceResendingToken token) {
                mVerificationId = verificationId;

                progressBar.setVisibility(View.INVISIBLE);

                activity_login_TextInputEditText1.setText("");
                activity_login_TextInputLayout1.setHint("Введите код из СМС");
                activity_login_MaterialButton.setText("Отправить код из СМС");

                Snackbar.make(coordinatorLayout, R.string.enter_code, Snackbar.LENGTH_LONG)
                        .setBackgroundTint(getColor(R.color.dark_grey2)).setTextColor(getColor(R.color.white)).show();

                activity_login_MaterialButton.setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View v) {

                        activity_login_MaterialButton.setText("");
                        progressBar.setVisibility(View.VISIBLE);

                        verifyPhoneNumberWithCode(mVerificationId, activity_login_TextInputEditText1.getText().toString());

                    }
                });

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

                }

                if (activity_login_TextInputLayout1.getHint().toString().equals("Введите код из СМС")) {

                    if (activity_login_TextInputEditText1.getText().length() == 6) {
                        hideKeyboardFrom(LoginActivity.this, activity_login_TextInputEditText1);
                    }

                }

            }

            @Override
            public void afterTextChanged(Editable s) {

            }
        });

        coordinatorLayout.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                hideKeyboardFrom(LoginActivity.this, activity_login_TextInputEditText1);
            }
        });

    }

    private void setOnClickListeners() {

        if (activity_login_MaterialButton.getText().toString().equals(getString(R.string.registration1))) {

            activity_login_MaterialButton.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {

                    if (phoneNumber.length() == 12) {

                        Snackbar.make(coordinatorLayout, R.string.wait_code, Snackbar.LENGTH_LONG)
                                .setBackgroundTint(getColor(R.color.dark_grey2)).setTextColor(getColor(R.color.white)).show();

                        PhoneAuthProvider.getInstance().verifyPhoneNumber(phoneNumber,
                                60,
                                TimeUnit.SECONDS,
                                LoginActivity.this,
                                mCallbacks);

                        progressBar.show();
                        activity_login_MaterialButton.setText("");

                        new Handler(Looper.getMainLooper()).postDelayed(new Runnable() {
                            @Override
                            public void run() {
                                LoginActivity.this.recreate();
                            }
                        }, 45000);

                    } else {

                        Snackbar.make(coordinatorLayout, R.string.enter_phone_number, Snackbar.LENGTH_LONG)
                                .setBackgroundTint(getColor(R.color.dark_grey2)).setTextColor(getColor(R.color.white)).show();

                    }

                }

            });

        }

    }

    private void verifyPhoneNumberWithCode(String verificationId, String code) {
        // [START verify_with_code]
        PhoneAuthCredential credential = PhoneAuthProvider.getCredential(verificationId, code);
        // [END verify_with_code]
        signInWithPhoneAuthCredential(credential);

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

                        } else {

                            // Sign in failed, display a message and update the UI
                            if (task.getException() instanceof FirebaseAuthInvalidCredentialsException) {

                                Snackbar.make(coordinatorLayout, "Вы ввели неверный код", Snackbar.LENGTH_LONG)
                                        .setBackgroundTint(getColor(R.color.dark_grey2)).setTextColor(getColor(R.color.white)).show();

                            }

                        }
                    }
                });
    }

    public static void hideKeyboardFrom(Context context, View view) {
        InputMethodManager imm = (InputMethodManager) context.getSystemService(Activity.INPUT_METHOD_SERVICE);
        imm.hideSoftInputFromWindow(view.getWindowToken(), 0);
    }

}
