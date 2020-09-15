package com.oldmgdn.boost;

import android.Manifest;
import android.content.Context;
import android.content.pm.PackageManager;
import android.graphics.Bitmap;
import android.graphics.Color;
import android.media.MediaScannerConnection;
import android.net.Uri;
import android.os.Build;
import android.os.Environment;
import android.view.Gravity;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.PopupWindow;
import android.widget.ProgressBar;
import android.widget.Toast;

import androidx.annotation.Nullable;
import androidx.cardview.widget.CardView;
import androidx.core.app.ActivityCompat;
import androidx.palette.graphics.Palette;

import com.bumptech.glide.load.DataSource;
import com.bumptech.glide.load.engine.DiskCacheStrategy;
import com.bumptech.glide.load.engine.GlideException;
import com.bumptech.glide.request.RequestListener;
import com.bumptech.glide.request.target.Target;
import com.github.chrisbanes.photoview.PhotoView;
import com.oldmgdn.boost.MainActivity.MainActivity;

import java.io.File;
import java.io.FileOutputStream;
import java.util.Random;

import static android.content.Context.LAYOUT_INFLATER_SERVICE;

public class PhotoFullPopupWindow extends PopupWindow {

    private PhotoView photoView;
    private ProgressBar loading;
    private Bitmap finalBitmap;
    private static final int WRITE_STORAGE_PERMISSION_REQUEST_CODE = 0x3;


    public PhotoFullPopupWindow(final Context ctx, View v, String imageUrl, Bitmap bitmap) {
        super(((LayoutInflater) ctx.getSystemService(LAYOUT_INFLATER_SERVICE)).inflate(R.layout.popup_photo_full, null), ViewGroup.LayoutParams.MATCH_PARENT,
                ViewGroup.LayoutParams.MATCH_PARENT);

        View view = getContentView();
        CardView closeButton = view.findViewById(R.id.ib_close);
        CardView download = view.findViewById(R.id.ib_download);
        setOutsideTouchable(true);

        setFocusable(true);


        closeButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                dismiss();
            }
        });


        download.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                if (!checkPermissionForReadExtertalStorage(ctx)){
                    try {
                        requestPermissionForReadExtertalStorage(ctx);
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                }

                saveImageToExternalStorage(finalBitmap, ctx);
                Toast.makeText(ctx, "Изображение сохранено в галерею", Toast.LENGTH_SHORT).show();

            }
        });

        photoView = view.findViewById(R.id.image);
        loading = view.findViewById(R.id.loading);
        photoView.setMaximumScale(6);

        if (bitmap != null) {
            loading.setVisibility(View.GONE);

                onPalette(Palette.from(bitmap).generate());


            photoView.setImageBitmap(bitmap);
        } else {
            loading.setIndeterminate(true);
            loading.setVisibility(View.VISIBLE);
            GlideApp.with(ctx).asBitmap()
                    .load(imageUrl)
                    .listener(new RequestListener<Bitmap>() {
                        @Override
                        public boolean onLoadFailed(@Nullable GlideException e, Object model, Target<Bitmap> target, boolean isFirstResource) {
                            loading.setIndeterminate(false);
                            loading.setBackgroundColor(Color.LTGRAY);
                            return false;
                        }

                        @Override
                        public boolean onResourceReady(Bitmap resource, Object model, Target<Bitmap> target, DataSource dataSource, boolean isFirstResource) {
                            onPalette(Palette.from(resource).generate());

                            photoView.setImageBitmap(resource);

                            loading.setVisibility(View.GONE);

                            finalBitmap = resource;
                            return false;
                        }
                    })


                    .diskCacheStrategy(DiskCacheStrategy.ALL)
                    .into(photoView);

            showAtLocation(v, Gravity.CENTER, 0, 0);
        }
        //------------------------------

    }

    public boolean checkPermissionForReadExtertalStorage(Context ctx) {

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            int result = ctx.checkSelfPermission(Manifest.permission.WRITE_EXTERNAL_STORAGE);
            return result == PackageManager.PERMISSION_GRANTED;
        }
        return false;
    }

    public void requestPermissionForReadExtertalStorage(Context ctx) throws Exception {

        try {
            ActivityCompat.requestPermissions( ((MainActivity) ctx), new String[]{Manifest.permission.WRITE_EXTERNAL_STORAGE},
                    WRITE_STORAGE_PERMISSION_REQUEST_CODE);
        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        }
    }

    private void onPalette(Palette palette) {
        if (null != palette) {
            ViewGroup parent = (ViewGroup) photoView.getParent().getParent();
            parent.setBackgroundColor(palette.getDarkVibrantColor(Color.GRAY));
        }
    }

    private void saveImageToExternalStorage(Bitmap finalBitmap, Context ctx) {
        String root = Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_PICTURES).toString();
        File myDir = new File(root + "/Cartalog");
        myDir.mkdirs();
        Random generator = new Random();
        int n = 10000;
        n = generator.nextInt(n);
        String fname = "Image-" + n + ".jpg";
        File file = new File(myDir, fname);
        if (file.exists())
            file.delete();
        try {
            FileOutputStream out = new FileOutputStream(file);
            finalBitmap.compress(Bitmap.CompressFormat.JPEG, 90, out);
            out.flush();
            out.close();
        }
        catch (Exception e) {
            e.printStackTrace();
        }


        // Tell the media scanner about the new file so that it is
        // immediately available to the user.
        MediaScannerConnection.scanFile(ctx, new String[]{file.toString()}, null,
                new MediaScannerConnection.OnScanCompletedListener() {
                    public void onScanCompleted(String path, Uri uri) {
                    }
                });

    }

}