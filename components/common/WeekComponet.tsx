

const WeekComponet: React.FC<any> = ({ selectedDays, onChange }) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const handleDayChange = (event: any, index: any) => {
        const isChecked = event.target.checked;
        if (isChecked) {
            onChange([...selectedDays, days[index]]);
        } else {
            onChange(selectedDays?.filter((day: any) => day !== days[index]));
        }
    };

    return (
        <>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                {days.map((day, index) => (
                    <div key={index}>
                        <div style={{ border: "1px solid #c9c9c9", padding: "4px", margin: "5px", borderRadius: "12px", background: "#f5f5f5" }}>
                            <label style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <input
                                    style={{ margin: "8px" }}
                                    type="checkbox"
                                    value={day}
                                    checked={selectedDays?.includes(day)}
                                    onChange={(event) => handleDayChange(event, index)}
                                />
                                <div style={{ color: "#bfbfbf" }}>{day}</div>
                            </label>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default WeekComponet;
