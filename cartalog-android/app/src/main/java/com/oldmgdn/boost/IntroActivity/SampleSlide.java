package com.oldmgdn.boost.IntroActivity;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.LinearLayout;

import androidx.annotation.Nullable;

import com.github.paolorotolo.appintro.AppIntroBaseFragment;
import com.github.paolorotolo.appintro.ISlideBackgroundColorHolder;
import com.oldmgdn.boost.R;


public class SampleSlide extends AppIntroBaseFragment implements ISlideBackgroundColorHolder {

    private static final String ARG_LAYOUT_RES_ID = "layoutResId";
    private static final String ARG_BG_COLOR = "colorResId";
    private int layoutResId;
    private int colorResId;
    private LinearLayout linearLayout;

    public static SampleSlide newInstance(int layoutResId, int colorResId) {
        SampleSlide sampleSlide = new SampleSlide();

        Bundle args = new Bundle();
        args.putInt(ARG_LAYOUT_RES_ID, layoutResId);
        args.putInt(ARG_BG_COLOR, colorResId);
        sampleSlide.setArguments(args);

        return sampleSlide;
    }

    @Override
    public void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        if (getArguments() != null && getArguments().containsKey(ARG_LAYOUT_RES_ID)) {
            layoutResId = getArguments().getInt(ARG_LAYOUT_RES_ID);
            colorResId = getArguments().getInt(ARG_BG_COLOR);

        }
    }

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container,
                             @Nullable Bundle savedInstanceState) {
        View layoutContainer = inflater.inflate(layoutResId, container, false);

        switch (layoutResId){

            case R.layout.fragment_intro_1:
                linearLayout = layoutContainer.findViewById(R.id.fragment_intro_1_container);
                break;

            case R.layout.fragment_intro_2:
                linearLayout = layoutContainer.findViewById(R.id.fragment_intro_2_container);
                break;

            case R.layout.fragment_intro_3:
                linearLayout = layoutContainer.findViewById(R.id.fragment_intro_3_container);
                break;

            case R.layout.fragment_intro_4:
                linearLayout = layoutContainer.findViewById(R.id.fragment_intro_4_container);
                break;

        }

        return layoutContainer;
    }

    @Override
    public int getDefaultBackgroundColor() {
        return colorResId;
    }

    @Override
    public void setBackgroundColor(int i) {
        linearLayout.setBackgroundColor(i);
    }

    @Override
    protected int getLayoutId() {
        return layoutResId;
    }
}