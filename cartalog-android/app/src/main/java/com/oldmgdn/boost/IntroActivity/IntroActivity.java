package com.oldmgdn.boost.IntroActivity;

import android.content.Intent;
import android.os.Bundle;

import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

import com.github.paolorotolo.appintro.AppIntro;
import com.oldmgdn.boost.LoginActivity.LoginActivity;
import com.oldmgdn.boost.R;

public class IntroActivity extends AppIntro {
    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        getSupportActionBar().hide();

        setSkipButtonEnabled(false);

        setFlowAnimation();

        addSlide(SampleSlide.newInstance(R.layout.fragment_intro_1));
        addSlide(SampleSlide.newInstance(R.layout.fragment_intro_2));
        addSlide(SampleSlide.newInstance(R.layout.fragment_intro_3));
        addSlide(SampleSlide.newInstance(R.layout.fragment_intro_4));
        addSlide(SampleSlide.newInstance(R.layout.fragment_intro_5));

    }

    @Override
    public void onSkipPressed(Fragment currentFragment) {
        super.onSkipPressed(currentFragment);

        Intent intent = new Intent(IntroActivity.this, LoginActivity.class);
        startActivity(intent);
        IntroActivity.this.finish();

    }

    @Override
    public void onDonePressed(Fragment currentFragment) {
        super.onDonePressed(currentFragment);

        Intent intent = new Intent(IntroActivity.this, LoginActivity.class);
        startActivity(intent);
        IntroActivity.this.finish();

    }

    @Override
    public void onSlideChanged(@Nullable Fragment oldFragment, @Nullable Fragment newFragment) {
        super.onSlideChanged(oldFragment, newFragment);
        // Do something when the slide changes.
    }
}