package com.yeoooo.getTrain;

import com.yeoooo.getTrain.crawling.TrainType;
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

