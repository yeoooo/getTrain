package com.yeoooo.getTrain.train;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@ToString
@Builder
@Setter
public class TrainDTO {
    private TrainType trainType;
    private String from;
    private String to;
    private String time_from;
    private String time_until;
}

