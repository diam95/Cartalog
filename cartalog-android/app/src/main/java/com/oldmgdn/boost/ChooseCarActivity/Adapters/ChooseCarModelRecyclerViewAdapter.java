package com.oldmgdn.boost.ChooseCarActivity.Adapters;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Filter;
import android.widget.Filterable;
import android.widget.TextView;

import androidx.recyclerview.widget.RecyclerView;

import com.oldmgdn.boost.R;

import java.util.ArrayList;
import java.util.List;


public class ChooseCarModelRecyclerViewAdapter extends RecyclerView.Adapter<ChooseCarModelRecyclerViewAdapter.MyViewHolder> implements Filterable {


    private List<String> mDataset, mDatasetFull;
    private Context mContext;
    private OnNoteListener mOnNoteListener;


    public class MyViewHolder extends RecyclerView.ViewHolder implements View.OnClickListener {

        public TextView name;
        public View divider;
        public OnNoteListener onNoteListener;


        public MyViewHolder(View v, OnNoteListener onNoteListener) {

            super(v);
            name = v.findViewById(R.id.cars_recyclerview_layout_model_name_TextView);
            divider = v.findViewById(R.id.cars_recyclerview_layout_model_divider_View);

            this.onNoteListener = onNoteListener;

            itemView.setOnClickListener(this);
        }

        @Override
        public void onClick(View v) {
            onNoteListener.onNoteClick(getAdapterPosition(), getFilteredList());
        }

    }

    private List<String> getFilteredList() {
        return mDataset;
    }

    public ChooseCarModelRecyclerViewAdapter(List<String> data, Context context, OnNoteListener onNoteListener) {
        this.mDataset = new ArrayList<>(data);
        this.mContext = context;
        this.mDatasetFull = new ArrayList<>(mDataset);
        this.mOnNoteListener = onNoteListener;
    }

    @Override
    public ChooseCarModelRecyclerViewAdapter.MyViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {

        return new ChooseCarModelRecyclerViewAdapter.MyViewHolder(LayoutInflater.from(mContext)
                .inflate(R.layout.cars_recyclerview_layout_model, parent, false), mOnNoteListener);


    }

    @Override
    public void onBindViewHolder(final ChooseCarModelRecyclerViewAdapter.MyViewHolder holder, final int position) {

        if (position + 1 == mDataset.size()) {
            holder.divider.setVisibility(View.INVISIBLE);
        } else {
            holder.divider.setVisibility(View.VISIBLE);
        }

        holder.name.setText(mDataset.get(position));
    }


    @Override
    public int getItemCount() {

        return mDataset.size();
    }

    @Override
    public Filter getFilter() {

        return exempleFilter;
    }

    private Filter exempleFilter = new Filter() {
        @Override
        protected FilterResults performFiltering(CharSequence constraint) {

            List<String> filteredList = new ArrayList<>();

            if (constraint == null || constraint.length() == 0) {

                filteredList = new ArrayList<>(mDatasetFull);

            } else {

                String filterpattern = constraint.toString().toLowerCase().trim();
                for (String item : mDatasetFull) {

                    if (item.toLowerCase().contains(filterpattern)) {

                        filteredList.add(item);
                    }
                }
            }

            FilterResults filterResults = new FilterResults();
            filterResults.values = filteredList;
            return filterResults;

        }


        @Override
        protected void publishResults(CharSequence constraint, FilterResults results) {

            mDataset = new ArrayList<>();
            mDataset.addAll((List) results.values);
            notifyDataSetChanged();
        }
    };

    public interface OnNoteListener {
        void onNoteClick(int position, List<String> filteredList);
    }

}
