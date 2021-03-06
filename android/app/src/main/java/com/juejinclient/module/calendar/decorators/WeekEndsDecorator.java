package com.juejinclient.module.calendar.decorators;

import android.graphics.Color;
import android.text.style.ForegroundColorSpan;

import com.prolificinteractive.materialcalendarview.CalendarDay;
import com.prolificinteractive.materialcalendarview.DayViewDecorator;
import com.prolificinteractive.materialcalendarview.DayViewFacade;

import java.util.Calendar;

public class WeekEndsDecorator implements DayViewDecorator {

    private final Calendar calendar = Calendar.getInstance();
    private Integer color = null;

    public WeekEndsDecorator() {
    }

    public WeekEndsDecorator(String color) {
        this.color = Color.parseColor(color);
    }

    @Override
    public boolean shouldDecorate(CalendarDay day) {
        day.copyTo(calendar);
        int weekDay = calendar.get(Calendar.DAY_OF_WEEK);
        return weekDay == Calendar.SATURDAY || weekDay == Calendar.SUNDAY;
    }

    @Override
    public void decorate(DayViewFacade view) {
        if (this.color != null) {
            view.addSpan(new ForegroundColorSpan(this.color));
        } else {
            view.addSpan(new ForegroundColorSpan(Color.RED));
        }
    }

    public void setColor(String color) {
        this.color = Color.parseColor(color);
    }
}