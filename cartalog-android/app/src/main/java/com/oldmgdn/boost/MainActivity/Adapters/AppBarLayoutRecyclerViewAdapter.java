package com.oldmgdn.boost.MainActivity.Adapters;

import android.content.Context;
import android.content.Intent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;

import androidx.cardview.widget.CardView;
import androidx.core.widget.ContentLoadingProgressBar;
import androidx.recyclerview.widget.RecyclerView;

import com.oldmgdn.boost.AdvDetailedActivity.AdvDetailedActivity;
import com.oldmgdn.boost.Objects.AdvObject;
import com.oldmgdn.boost.R;
import com.squareup.picasso.Callback;
import com.squareup.picasso.Picasso;

import java.util.List;



public class AppBarLayoutRecyclerViewAdapter extends RecyclerView.Adapter<AppBarLayoutRecyclerViewAdapter.MyViewHolder> {

    private List<AdvObject> mDataset;
    private Context mContext;

    public static class MyViewHolder extends RecyclerView.ViewHolder {
        public CardView cardView;
        public ContentLoadingProgressBar contentLoadingProgressBar;
        public ImageView image;

        public MyViewHolder(View v) {
            super(v);
            contentLoadingProgressBar = v.findViewById(R.id.activity_main_AppBarLayout_RecyclerView_ContentLoadingProgressBar);
            cardView = v.findViewById(R.id.activity_main_AppBarLayout_RecyclerView_CardView);
            image = v.findViewById(R.id.activity_main_AppBarLayout_RecyclerView_CardView_ImageView);
        }
    }

    public AppBarLayoutRecyclerViewAdapter(List<AdvObject> dataset, Context context) {
        mDataset = dataset;
        mContext = context;
    }

    @Override
    public AppBarLayoutRecyclerViewAdapter.MyViewHolder onCreateViewHolder(ViewGroup parent,
                                                                           int viewType) {
        return new AppBarLayoutRecyclerViewAdapter.MyViewHolder(LayoutInflater.from(mContext)
                .inflate(R.layout.activity_main_appbar_recyclerview, parent, false));
    }

    @Override
    public void onBindViewHolder(final MyViewHolder holder, final int position) {

        holder.contentLoadingProgressBar.show();

        if (mDataset.size() > 0) {

            final String advRef = mDataset.get(position).image;


            Picasso.get().load(advRef).into(holder.image, new Callback() {
                @Override
                public void onSuccess() {
                    holder.contentLoadingProgressBar.hide();

                    holder.image.setOnClickListener(new View.OnClickListener() {
                        @Override
                        public void onClick(View v) {

                            final String title = mDataset.get(position).title;
                            final String vendorID = mDataset.get(position).vendorID;
                            final String content = mDataset.get(position).content;

                            Intent intent = new Intent(mContext, AdvDetailedActivity.class);

                            intent.putExtra("advRef", advRef);
                            intent.putExtra("title", title);
                            intent.putExtra("vendorID", vendorID);
                            intent.putExtra("content", content);

                            mContext.startActivity(intent);

                        }
                    });
                }

                @Override
                public void onError(Exception e) {
                }
            });
        }

    }

    @Override
    public int getItemCount() {

        if (mDataset.size() > 0) {
            return mDataset.size();
        } else return 3;
    }
}
