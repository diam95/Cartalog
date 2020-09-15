package com.oldmgdn.boost.DigestActivity.Adaрters;

import android.content.Context;
import android.content.Intent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;
import androidx.recyclerview.widget.RecyclerView;

import com.oldmgdn.boost.DigestActivity.DigestDetailedActivity;
import com.oldmgdn.boost.Objects.РartnerObject;
import com.oldmgdn.boost.R;

import java.util.List;

public class DigestRecyclerViewAdapter extends RecyclerView.Adapter<DigestRecyclerViewAdapter.MyViewHolder> {

    private List<РartnerObject> mDataset;
    private Context mContext;

    public static class MyViewHolder extends RecyclerView.ViewHolder {

        public TextView name;

        public MyViewHolder(View v) {
            super(v);
            name = v.findViewById(R.id.digest_recyclerview_textview);
        }
    }

    public DigestRecyclerViewAdapter(List<РartnerObject> myDataset, Context myContext) {
        mDataset = myDataset;
        mContext = myContext;
    }

    @Override
    public DigestRecyclerViewAdapter.MyViewHolder onCreateViewHolder(ViewGroup parent,
                                                                      int viewType) {
        return new DigestRecyclerViewAdapter.MyViewHolder(LayoutInflater.from(mContext)
                .inflate(R.layout.digest_recyclerview, parent, false));
    }

    @Override
    public void onBindViewHolder(final MyViewHolder holder, final int position) {

        final РartnerObject object = mDataset.get(position);

        holder.name.setText(object.name);

        holder.itemView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(mContext, DigestDetailedActivity.class);
                intent.addFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP);
                intent.putExtra("name", object.name);
                intent.putExtra("coord1", object.coord1);
                intent.putExtra("coord2", object.coord2);
                intent.putExtra("tel", object.tel);
                intent.putExtra("uid", object.uid);
                intent.putExtra("mon", object.mon);
                intent.putExtra("tue", object.tue);
                intent.putExtra("wed", object.wed);
                intent.putExtra("thu", object.thu);
                intent.putExtra("fri", object.fri);
                intent.putExtra("sat", object.sat);
                intent.putExtra("sun", object.sun);
                intent.putExtra("address", object.address);
                intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                mContext.startActivity(intent);
            }
        });

    }

    @Override
    public int getItemCount() {
        return mDataset.size();
    }
}
