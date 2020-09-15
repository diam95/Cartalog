package com.oldmgdn.boost.ChooseCarActivity.Adapters;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Filter;
import android.widget.Filterable;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.recyclerview.widget.RecyclerView;

import com.oldmgdn.boost.R;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;


public class ChooseCarRecyclerViewAdapter extends RecyclerView.Adapter<ChooseCarRecyclerViewAdapter.MyViewHolder> implements Filterable {

    private List<String> filteredList2;
    private List<String> makeDataset;
    private List<String> letters;
    private List<String> data_part;
    private List<Integer> resIds;
    private Context mContext;
    private OnNoteListener mOnNoteListener;
    private List<Integer> keysList;


    public class MyViewHolder extends RecyclerView.ViewHolder implements View.OnClickListener {

        public TextView name, letter;
        public View divider;
        public ImageView logo;
        public OnNoteListener onNoteListener;

        public MyViewHolder(View v, OnNoteListener onNoteListener) {
            super(v);
            name = v.findViewById(R.id.cars_recyclerview_layout_name_TextView);
            logo = v.findViewById(R.id.cars_recyclerview_layout_logo_ImageView);
            divider = v.findViewById(R.id.cars_recyclerview_layout_divider_View);
            letter = v.findViewById(R.id.cars_recyclerview_letter_TextView);
            this.onNoteListener = onNoteListener;

            itemView.setOnClickListener(this);
        }

        @Override
        public void onClick(View v) {
            onNoteListener.onNoteClick(getAdapterPosition(), getFilteredList());
        }


    }

    public ChooseCarRecyclerViewAdapter(List<String> data, Context context, List<Integer> resIds, OnNoteListener onNoteListener, List<String> data_part, List<String> letters) {
        this.makeDataset = new ArrayList<>(data);
        this.mContext = context;
        this.data_part = data_part;
        this.resIds = resIds;
        this.mOnNoteListener = onNoteListener;
        this.keysList = new ArrayList<>();
        this.letters = letters;
        this.filteredList2 = new ArrayList<>(data);
    }

    @Override
    public ChooseCarRecyclerViewAdapter.MyViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {

        return new ChooseCarRecyclerViewAdapter.MyViewHolder(LayoutInflater.from(mContext)
                .inflate(R.layout.cars_recyclerview_layout, parent, false), mOnNoteListener);


    }

    @Override
    public void onBindViewHolder(final ChooseCarRecyclerViewAdapter.MyViewHolder holder, final int position) {

        String name = data_part.get(position);
        holder.name.setText(name);

        String letter = letters.get(position);
        holder.letter.setText(letter);

        if (keysList.size() > 0) {


                int resID = resIds.get(keysList.get(position));
                holder.logo.setBackgroundResource(resID);

        } else {

            int resID = resIds.get(position);
            holder.logo.setBackgroundResource(resID);
        }

        if (data_part.size() - 1 == position) {

            holder.divider.setVisibility(View.INVISIBLE);

        } else {
            holder.divider.setVisibility(View.VISIBLE);
        }

        int trash = 0;

        for (String item: makeDataset){

            if (item.equals(name)){
                trash=1;
            }
        }

        if (trash==0){
            holder.logo.setBackgroundResource(0);
            holder.letter.setBackgroundResource(0);
        }

    }

    @Override
    public Filter getFilter() {

        return exempleFilter;
    }

    private Filter exempleFilter = new Filter() {
        @Override
        protected FilterResults performFiltering(CharSequence constraint) {

            List<String> filteredList = new ArrayList<>();
            keysList = new ArrayList<>();

            if (constraint == null || constraint.length() == 0) {

                filteredList2 = new ArrayList<>(makeDataset);
                filteredList = new ArrayList<>(makeDataset);
                keysList = new ArrayList<>();

            } else {

                String filterpattern = constraint.toString().toLowerCase().trim();
                for (String item : Arrays.asList(mContext.getResources().getStringArray(R.array.manufacturers1))) {

                    if (item.toLowerCase().contains(filterpattern)) {

                        filteredList.add(item);
                        keysList.add(makeDataset.indexOf(item));
                    }
                }
            }

            FilterResults filterResults = new FilterResults();
            filterResults.values = filteredList;
            return filterResults;

        }

        @Override
        protected void publishResults(CharSequence constraint, FilterResults results) {

            data_part = new ArrayList<>();
            data_part.addAll((List) results.values);
            filteredList2 = new ArrayList<>(data_part);
            notifyDataSetChanged();
        }
    };


    @Override
    public int getItemCount() {

        return data_part.size();

    }

    private List<String> getFilteredList() {

        return filteredList2;
    }

    public interface OnNoteListener {
        void onNoteClick(int position, List<String> filteredList);
    }
}
