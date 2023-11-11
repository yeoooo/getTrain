package com.yeoooo.getTrain.train;

public enum TrainType {
    ALL(0),
    KTX(1),
    ITX(3),
    MUGUNGHWA(4);

    private final int index;

    TrainType(int index){
        this.index = index;
    }

    public int getIndex() {
        return index;
    }
}
