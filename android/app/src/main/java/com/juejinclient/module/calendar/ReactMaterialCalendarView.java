package com.juejinclient.module.calendar;

import android.annotation.SuppressLint;
import android.content.Context;
import android.support.annotation.NonNull;
import android.view.ViewGroup;

import com.juejinclient.module.calendar.decorators.EventDecorator;
import com.juejinclient.module.calendar.decorators.TodayDecorator;
import com.juejinclient.module.calendar.decorators.WeekEndsDecorator;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.events.RCTEventEmitter;
import com.prolificinteractive.materialcalendarview.CalendarDay;
import com.prolificinteractive.materialcalendarview.MaterialCalendarView;
import com.prolificinteractive.materialcalendarview.OnDateSelectedListener;
import com.prolificinteractive.materialcalendarview.OnMonthChangedListener;

import java.text.SimpleDateFormat;
import java.util.Calendar;

public class ReactMaterialCalendarView extends MaterialCalendarView implements OnDateSelectedListener, OnMonthChangedListener {
    private WeekEndsDecorator weekEnds;
    private EventDecorator events;
    private TodayDecorator today;

    public ReactMaterialCalendarView(Context context) {
        super(context);
        setLayoutParams(new ViewGroup.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT,
                ViewGroup.LayoutParams.WRAP_CONTENT
        ));

        this.setOnDateChangedListener(this);
        this.setOnMonthChangedListener(this);

        weekEnds = new WeekEndsDecorator();
        events = new EventDecorator();
        events.setColor("#e82225");
        today = new TodayDecorator(context, this.getSelectionColor());

        this.addDecorators(today, weekEnds, events);
    }

    public EventDecorator getEvents() {
        return events;
    }

    private final Runnable mLayoutRunnable = new Runnable() {
        @Override
        public void run() {
            measure(MeasureSpec.makeMeasureSpec(getWidth(), MeasureSpec.EXACTLY),
                    MeasureSpec.makeMeasureSpec(getHeight(), MeasureSpec.EXACTLY));
            layout(getLeft(), getTop(), getRight(), getBottom());
        }
    };

    @Override
    public void requestLayout() {
        super.requestLayout();
        post(mLayoutRunnable);
    }

    @Override
    public void onDateSelected(@NonNull MaterialCalendarView widget, @NonNull CalendarDay date, boolean selected) {
        @SuppressLint("SimpleDateFormat") SimpleDateFormat df = new SimpleDateFormat("yyyy/MM/dd");
        Calendar calendar = date.getCalendar();
        WritableMap event = Arguments.createMap();
        event.putString("date", df.format(calendar.getTime()));
        event.putBoolean("selected", selected);
        ReactContext reactContext = (ReactContext) getContext();
        reactContext
                .getJSModule(RCTEventEmitter.class)
                .receiveEvent(
                        getId(),
                        "topDateChange",
                        event
                );
    }

    @Override
    public void onMonthChanged(MaterialCalendarView widget, CalendarDay date) {
        WritableMap event = Arguments.createMap();
        event.putInt("month", date.getMonth());
        ReactContext reactContext = (ReactContext) getContext();
        reactContext
                .getJSModule(RCTEventEmitter.class)
                .receiveEvent(
                        getId(),
                        "topMonthChange",
                        event
                );
    }

    public void setWeekEndsColor(String color) {
        weekEnds.setColor(color);
    }

    public void setEventsColor(String color) {
        events.setColor(color);
    }

    public void setTodayColor(String color) {
        today.setColor(color);
    }
}
