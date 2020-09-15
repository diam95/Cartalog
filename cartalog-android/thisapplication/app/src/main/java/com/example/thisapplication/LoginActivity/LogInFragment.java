package com.oldmgdn.thisapplication.LoginActivity;

import android.app.ProgressDialog;
import android.content.Intent;
import android.graphics.Color;
import android.graphics.Typeface;
import android.os.Build;
import android.os.Bundle;
import android.support.annotation.NonNull;
import androidx.constraintlayout.ConstraintLayout;
import android.support.design.widget.TextInputEditText;
import android.support.design.widget.TextInputLayout;
import android.support.transition.ChangeBounds;
import android.support.transition.Transition;
import android.support.transition.TransitionListenerAdapter;
import android.support.transition.TransitionManager;
import android.support.transition.TransitionSet;
import androidx.core.content.ContextCompat;
import android.text.Editable;
import android.util.TypedValue;
import android.view.View;
import android.annotation.TargetApi;
import android.support.annotation.Nullable;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.oldmgdn.thisapplication.MainActivity.MainActivity;
import com.oldmgdn.thisapplication.R;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.FirebaseException;
import com.google.firebase.auth.AuthResult;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthInvalidCredentialsException;
import com.google.firebase.auth.PhoneAuthCredential;
import com.google.firebase.auth.PhoneAuthProvider;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;

import java.util.List;
import java.util.concurrent.TimeUnit;

import butterknife.BindViews;

public class LogInFragment extends AuthFragment {

    private Button login_button_getCode, login_button_OK;
    private EditText password_input_edit, email_input_edit;
    private String codeSent;
    private FirebaseAuth mAuth;
    private TextInputLayout email_input;

    @BindViews(value = {R.id.email_input_edit, R.id.password_input_edit})
    protected List<TextInputEditText> views;

    @Override
    public void onViewCreated(View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);

        email_input = view.findViewById(R.id.email_input);
        login_button_getCode = view.findViewById(R.id.login_button_getCode);
        login_button_OK = view.findViewById(R.id.login_button_OK);
        email_input_edit = view.findViewById(R.id.email_input_edit);
        password_input_edit = view.findViewById(R.id.password_input_edit);
        mAuth = FirebaseAuth.getInstance();

        if (view != null) {
            caption.setText(getString(R.string.log_in_label));
            view.setBackgroundColor(ContextCompat.getColor(getContext(), R.color.color_log_in));
            for (TextInputEditText editText : views) {
                if (editText.getId() == R.id.password_input_edit) {
                    final TextInputLayout inputLayout = view.findViewById(R.id.password_input);
                    Typeface boldTypeface = Typeface.defaultFromStyle(Typeface.BOLD);
                    inputLayout.setTypeface(boldTypeface);
                    editText.addTextChangedListener(new TextWatcherAdapter() {
                        @Override
                        public void afterTextChanged(Editable editable) {
                            inputLayout.setPasswordVisibilityToggleEnabled(editable.length() > 0);
                        }
                    });
                }
                editText.setOnFocusChangeListener((temp, hasFocus) -> {
                    if (!hasFocus) {
                        boolean isEnabled = editText.getText().length() > 0;
                        editText.setSelected(isEnabled);
                    }
                });
            }
        }

        setOnClickListeners();

    }

    public void setOnClickListeners() {

        email_input_edit.setOnFocusChangeListener(new View.OnFocusChangeListener() {
            @Override
            public void onFocusChange(View view, boolean b) {

                if (email_input_edit.getText().length() != 12) {
                    email_input_edit.setText("+7");
                    email_input_edit.post(new Runnable() {
                        @Override
                        public void run() {
                            email_input_edit.setSelection(2);
                        }
                    });
                }

            }
        });

        login_button_getCode.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                if (email_input_edit.getText().length() == 12) {

                    sendVerificationCode();

                    login_button_getCode.setVisibility(View.INVISIBLE);
                    password_input_edit.setVisibility(View.VISIBLE);
                    login_button_OK.setVisibility(View.VISIBLE);
                    Toast.makeText(getContext(), "Дождитесь СМС с паролем и введите его.", Toast.LENGTH_SHORT).show();


                } else {
                    Toast.makeText(getContext(), "Введите номер телефона, без 8.", Toast.LENGTH_SHORT).show();
                }

            }
        });

        login_button_OK.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                verifySignInCode();
            }
        });
    }


    private void sendVerificationCode() {

        String phone = email_input_edit.getText().toString();

        if (phone.isEmpty()) {
            email_input_edit.setError("Введите номер");
            email_input_edit.requestFocus();
            return;
        }

        PhoneAuthProvider.getInstance().verifyPhoneNumber(
                phone,        // Phone number to verify
                60,                 // Timeout duration
                TimeUnit.SECONDS,   // Unit of timeout
                getActivity(),               // Activity (for callback binding)
                mCallbacks);        // OnVerificationStateChangedCallbacks


    }

    PhoneAuthProvider.OnVerificationStateChangedCallbacks mCallbacks = new PhoneAuthProvider.OnVerificationStateChangedCallbacks() {

        @Override
        public void onVerificationCompleted(PhoneAuthCredential phoneAuthCredential) {

        }

        @Override
        public void onVerificationFailed(FirebaseException e) {

        }

        @Override
        public void onCodeSent(String s, PhoneAuthProvider.ForceResendingToken forceResendingToken) {
            super.onCodeSent(s, forceResendingToken);

            codeSent = s;
        }
    };

    private void verifySignInCode() {
        if (password_input_edit.getText().toString().length() > 0) {
            String code = password_input_edit.getText().toString();
            PhoneAuthCredential credential = PhoneAuthProvider.getCredential(codeSent, code);
            signInWithPhoneAuthCredential(credential);
        } else {
            Toast.makeText(getContext(), "Введите СМС пароль", Toast.LENGTH_SHORT).show();
        }
    }

    private void signInWithPhoneAuthCredential(PhoneAuthCredential credential) {

        ProgressDialog pd = new ProgressDialog(getContext());
        pd.setMessage("Загрузка...");
        pd.show();

        mAuth.signInWithCredential(credential)
                .addOnCompleteListener(new OnCompleteListener<AuthResult>() {
                    @Override
                    public void onComplete(@NonNull Task<AuthResult> task) {
                        if (task.isSuccessful()) {
                            //here you can open new activity

                            FirebaseDatabase database = FirebaseDatabase.getInstance();
                            DatabaseReference databaseReference = database.getReference("users");
                            FirebaseAuth mAuth = FirebaseAuth.getInstance();

                            databaseReference.child(mAuth.getUid()).child("type").setValue("customer");

                            Toast.makeText(getContext(), "Вы вошли", Toast.LENGTH_LONG).show();
                            pd.dismiss();

                            Intent intent = new Intent(getActivity(), MainActivity.class);
                            startActivity(intent);
                        } else {
                            if (task.getException() instanceof FirebaseAuthInvalidCredentialsException) {
                                Toast.makeText(getContext(),
                                        "Неверный СМС код ", Toast.LENGTH_LONG).show();
                            }
                        }
                    }
                });
    }


    @Override
    public int authLayout() {
        return R.layout.fragment_login;
    }

    @Override
    @TargetApi(Build.VERSION_CODES.LOLLIPOP)
    public void fold() {
        lock = false;
        Rotate transition = new Rotate();
        transition.setEndAngle(-90f);
        transition.addTarget(caption);
        TransitionSet set = new TransitionSet();
        set.setDuration(getResources().getInteger(R.integer.duration));
        ChangeBounds changeBounds = new ChangeBounds();
        set.addTransition(changeBounds);
        set.addTransition(transition);
        TextSizeTransition sizeTransition = new TextSizeTransition();
        sizeTransition.addTarget(caption);
        set.addTransition(sizeTransition);
        set.setOrdering(TransitionSet.ORDERING_TOGETHER);
        final float padding = getResources().getDimension(R.dimen.folded_label_padding) / 2;
        set.addListener(new TransitionListenerAdapter() {
            @Override
            public void onTransitionEnd(Transition transition) {
                super.onTransitionEnd(transition);
                caption.setTranslationX(-padding);
                caption.setRotation(0);
                caption.setVerticalText(true);
                caption.requestLayout();

            }
        });
        TransitionManager.beginDelayedTransition(parent, set);
        caption.setTextSize(TypedValue.COMPLEX_UNIT_PX, caption.getTextSize() / 2);
        caption.setTextColor(Color.WHITE);
        ConstraintLayout.LayoutParams params = getParams();
        params.leftToLeft = ConstraintLayout.LayoutParams.UNSET;
        params.verticalBias = 0.6f;
        caption.setLayoutParams(params);
        caption.setTranslationX(caption.getWidth() / 8 - padding);
    }

    @Override
    public void clearFocus() {
        for (View view : views) view.clearFocus();
    }

}
