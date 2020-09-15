package com.oldmgdn.boost.ChatWithVendor.Adapters;


import android.content.Context;
import android.graphics.Bitmap;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.core.widget.ContentLoadingProgressBar;
import androidx.recyclerview.widget.RecyclerView;

import com.bumptech.glide.Glide;
import com.bumptech.glide.load.DataSource;
import com.bumptech.glide.load.engine.GlideException;
import com.bumptech.glide.request.RequestListener;
import com.bumptech.glide.request.target.Target;
import com.oldmgdn.boost.ChatWithVendor.ChatWithVendorActivity;
import com.oldmgdn.boost.PhotoFullPopupWindow;
import com.oldmgdn.boost.Objects.ChatObject;
import com.oldmgdn.boost.R;

import java.util.List;

public class ChatRecyclerViewAdapter extends RecyclerView.Adapter<RecyclerView.ViewHolder> {

    private List<ChatObject> mDataset;
    private Context mContext;
    private ChatObject chatObject;


    public ChatRecyclerViewAdapter(List<ChatObject> myDataset, Context myContext) {
        this.mDataset = myDataset;
        this.mContext = myContext;
    }

    public static class VendorMessage extends RecyclerView.ViewHolder {

        public TextView message, time;

        public VendorMessage(View itemView) {
            super(itemView);
            message = itemView.findViewById(R.id.chat_recyclerview_vendor_message);
            time = itemView.findViewById(R.id.chat_recyclerview_vendor_message_time);
        }
    }

    public static class VendorMessageImage extends RecyclerView.ViewHolder {

        public TextView time;
        public ImageView imageView;
        public ContentLoadingProgressBar progressBar;

        public VendorMessageImage(View itemView) {
            super(itemView);
            progressBar = itemView.findViewById(R.id.chat_recyclerview1_contentBar);
            imageView = itemView.findViewById(R.id.chat_recyclerview_vendor_message_image_ImageView);
            time = itemView.findViewById(R.id.chat_recyclerview_vendor_message_image_time_TextView);
        }
    }

    public static class ClientMessage extends RecyclerView.ViewHolder {

        public TextView message, time;

        public ClientMessage(View itemView) {
            super(itemView);
            message = itemView.findViewById(R.id.chat_recyclerview_client_message);
            time = itemView.findViewById(R.id.chat_recyclerview_client_message_time);
        }

    }

    public static class ClientMessageImage extends RecyclerView.ViewHolder {

        public TextView time;
        public ImageView imageView;
        public ContentLoadingProgressBar progressBar;

        public ClientMessageImage(View itemView) {
            super(itemView);
            progressBar = itemView.findViewById(R.id.chat_recyclerview4_contentBar);
            imageView = itemView.findViewById(R.id.chat_recyclerview_client_message_image_ImageView);
            time = itemView.findViewById(R.id.chat_recyclerview_client_message_image_time_TextView);
        }

    }

    @Override
    public RecyclerView.ViewHolder onCreateViewHolder(@NonNull ViewGroup viewGroup, int viewType) {

        View view;

        if (viewType == 0) {

            view = LayoutInflater.from(mContext).inflate(R.layout.chat_recyclerview0, viewGroup, false);
            return new VendorMessage(view);

        } else if (viewType == 1) {

            view = LayoutInflater.from(mContext).inflate(R.layout.chat_recyclerview1, viewGroup, false);
            return new VendorMessageImage(view);

        } else if (viewType == 2) {

            view = LayoutInflater.from(mContext).inflate(R.layout.chat_recyclerview2, viewGroup, false);
            return new ClientMessage(view);

        } else if (viewType == 3) {

            view = LayoutInflater.from(mContext).inflate(R.layout.chat_recyclerview3, viewGroup, false);
            return new ClientMessageImage(view);

        } else {

            return null;

        }
    }


    @Override
    public void onBindViewHolder(@NonNull final RecyclerView.ViewHolder viewHolder, int position) {

        chatObject = mDataset.get(position);

        String time = chatObject.time;
        final String message = chatObject.message;

        switch (getItemViewType(position)) {

            case 0:

                ((VendorMessage) viewHolder).message.setText(message);
                ((VendorMessage) viewHolder).time.setText(time + " ");
                break;

            case 1:

                ((VendorMessageImage) viewHolder).progressBar.show();
                final ImageView imageView = ((VendorMessageImage) viewHolder).imageView;

                if (message.length() > 1) {
                    Glide.with(mContext).asBitmap()
                            .load(message)
                            .listener(new RequestListener<Bitmap>() {
                                @Override
                                public boolean onLoadFailed(@Nullable GlideException e, Object model, Target<Bitmap> target, boolean isFirstResource) {
                                    return false;
                                }

                                @Override
                                public boolean onResourceReady(Bitmap resource, Object model, Target<Bitmap> target, DataSource dataSource, boolean isFirstResource) {

                                    ((ChatWithVendorActivity) mContext).scrollToBottom();

                                    return false;
                                }
                            }).into(imageView);
                    ((VendorMessageImage) viewHolder).progressBar.hide();
                }
                ((VendorMessageImage) viewHolder).time.setText(time + " ");

                imageView.setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View v) {

                        new PhotoFullPopupWindow(mContext, imageView, message, null);

                    }
                });

                break;

            case 2:

                ((ClientMessage) viewHolder).message.setText(message);
                ((ClientMessage) viewHolder).time.setText(time + " ");
                break;

            case 3:

                ((ClientMessageImage) viewHolder).progressBar.show();
                final ImageView imageView3 = ((ClientMessageImage) viewHolder).imageView;

                if (chatObject.message.length() > 1) {
                    Glide.with(mContext).asBitmap()
                            .load(message)
                            .listener(new RequestListener<Bitmap>() {
                                @Override
                                public boolean onLoadFailed(@Nullable GlideException e, Object model, Target<Bitmap> target, boolean isFirstResource) {
                                    return false;
                                }

                                @Override
                                public boolean onResourceReady(Bitmap resource, Object model, Target<Bitmap> target, DataSource dataSource, boolean isFirstResource) {

                                    ((ChatWithVendorActivity) mContext).scrollToBottom();

                                    return false;
                                }
                            }).into(imageView3);
                    ((ClientMessageImage) viewHolder).progressBar.hide();
                }
                ((ClientMessageImage) viewHolder).time.setText(time + " ");

                imageView3.setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View v) {

                        new PhotoFullPopupWindow(mContext, imageView3, message, null);

                    }
                });


                break;

        }

        ((ChatWithVendorActivity) mContext).scrollToBottom();

    }

    @Override
    public int getItemCount() {
        return mDataset.size();
    }

    @Override
    public int getItemViewType(int position) {
        return mDataset.get(position).viewType;
    }

}
