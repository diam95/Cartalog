package com.oldmgdn.boost.IntroActivity;

import android.content.Intent;
import android.os.Bundle;

import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

import com.github.paolorotolo.appintro.AppIntro2;
import com.oldmgdn.boost.MainActivity.MainActivity;
import com.oldmgdn.boost.R;

public class IntroActivity extends AppIntro2 {

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        getSupportActionBar().hide();

        setSkipButtonEnabled(false);
        setProgressIndicator();
        setScrollDurationFactor(3);

        addSlide(SampleSlide.newInstance(R.layout.fragment_intro_1, getColor(R.color.dark_grey3)));
        addSlide(SampleSlide.newInstance(R.layout.fragment_intro_2, getColor(R.color.green)));
        addSlide(SampleSlide.newInstance(R.layout.fragment_intro_3, getColor(R.color.color_sign_up)));
        addSlide(SampleSlide.newInstance(R.layout.fragment_intro_4, getColor(R.color.light_light_red)));

        setColorTransitionsEnabled(true);

    }

    @Override
    public void onSkipPressed(Fragment currentFragment) {
        super.onSkipPressed(currentFragment);

        Intent intent = new Intent(IntroActivity.this, MainActivity.class);
        startActivity(intent);
        IntroActivity.this.finish();

    }

    @Override
    public void onDonePressed(Fragment currentFragment) {
        super.onDonePressed(currentFragment);

        Intent intent = new Intent(IntroActivity.this, MainActivity.class);
        startActivity(intent);
        IntroActivity.this.finish();

    }

    @Override
    public void onSlideChanged(@Nullable Fragment oldFragment, @Nullable Fragment newFragment) {
        super.onSlideChanged(oldFragment, newFragment);

    }


}