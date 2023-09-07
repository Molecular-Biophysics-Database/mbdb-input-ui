import React from 'react';
import { Input as SInput } from 'semantic-ui-react';
import { ItemLabel } from './label';
import { PathId } from '../path-id';
import { FormContextInstance } from '../../../context';
import { Help } from '../../../schema';
import { Path } from '../../../schema/data';
import { Value } from '../../../schema/value';
import { CommonValidators } from '../../../schema/validators';
import { clamp, daysInMonth, isLeapYear } from '../../../util';

export type Props = {
    label: string,
    isRequired: boolean,
    isDisabled: boolean,
    help?: Help,
    path: Path,
}

export function CalendarDateInput({ label, isRequired, isDisabled, help, path }: Props) {
    const id = React.useMemo(() => PathId.toId(path), [path]);
    const { handler } = React.useContext(FormContextInstance);
    const value = handler.getValue(path);
    const { year, month, day } = Value.toCalendarDate(value);
    const [dateInput, setDateInput] = React.useState({ y: year.toString(), m: month.toString(), d: day.toString() });

    return (
        <>
            <ItemLabel id={id} label={label} markAsRequired={isRequired} help={help} />
            <div
                style={{ alignItems: 'center', display: 'flex', flexDirection: 'row', gap: '1em' }}
            >
                <div>Year</div>
                <SInput
                    style={{ width: '6em' }}
                    type='number'
                    min={1}
                    max={3000}
                    value={dateInput.y}
                    onChange={(_ev, data) => {
                        let yN = parseInt(data.value);
                        let _d = day;
                        if (!isNaN(yN)) {
                            const newYear = clamp(yN, 1, 3000);
                            const newDay = !isLeapYear(newYear) && month === 2 && day === 29 ? 28 : day;

                            yN = newYear;
                            _d = newDay;

                            const v = Value.calendarDate(newYear, month, newDay, CommonValidators.isCalendarDate({ year: newYear, month, day: newDay }));
                            handler.set(path, v);
                        } else {
                            handler.set(path, Value.calendarDate(year, month, day, false));
                        }
                        setDateInput((i) => ({ ...i, y: yN.toString(), d: _d.toString() }));
                    }}
                    disabled={isDisabled}
                    error={!value.isValid && !isDisabled}
                />
                <div>Month</div>
                <SInput
                    style={{ width: '6em' }}
                    type='number'
                    min={1}
                    max={12}
                    value={dateInput.m}
                    onChange={(ev, data) => {
                        let mN = parseInt(data.value);
                        let _d = day;
                        if (!isNaN(mN)) {
                            const newMonth = clamp(mN,  1, 12);
                            const newDay = daysInMonth(newMonth, year) < day ? 1 : day;

                            mN = newMonth;
                            _d = newDay;
                            handler.set(path, Value.calendarDate(year, newMonth, newDay));
                        } else {
                            handler.set(path, Value.calendarDate(year, month, day, false));
                        }
                        setDateInput((i) => ({ ...i, m: mN.toString(), d: _d.toString() }));
                    }}
                    disabled={isDisabled}
                    error={!value.isValid && !isDisabled}
                />
                <div>Day</div>
                <SInput
                    style={{ width: '6em' }}
                    type='number'
                    min={1}
                    max={daysInMonth(month, year)}
                    value={dateInput.d}
                    onChange={(ev, data) => {
                        let dN = parseInt(data.value);
                        if (!isNaN(dN)) {
                            const dim = daysInMonth(month, year);
                            const newDay = clamp(dN, 1, dim);

                            dN = newDay;
                            handler.set(path, Value.calendarDate(year, month, newDay));
                        } else {
                            handler.set(path, Value.calendarDate(year, month, day, false));
                        }
                        setDateInput((i) => ({ ...i, d: dN.toString() }));
                    }}
                    disabled={isDisabled}
                    error={!value.isValid && !isDisabled}
                />
            </div>
        </>
    );
}
