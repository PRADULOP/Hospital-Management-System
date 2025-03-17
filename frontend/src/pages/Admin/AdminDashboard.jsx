import React, { useEffect, useState } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Cell, ResponsiveContainer, PieChart, Pie, Legend, LineChart, Line } from "recharts";
import "../Admin/style.css";

const AdminDashboard = () => {
    const [analytics, setAnalytics] = useState({
        totalRevenue: 100000,
        doctorCount: 50000,
        patientCount: 30000,
        appointmentCount: 70000,
        revenueGrowth: 12.5,
        doctorGrowth: 5.2,
        patientGrowth: 8.7,
        appointmentGrowth: 15.3
    });
    
    const [timeframe, setTimeframe] = useState("monthly");
    const [selectedMetric, setSelectedMetric] = useState("revenue");

    useEffect(() => {
        axios.get(`http://localhost:5000/api/admin/analytics?timeframe=${timeframe}`)
            .then(res => setAnalytics(res.data))
            .catch(err => console.error(err));
    }, [timeframe]);

    // Mock data for trends
    const trendData = {
        revenue: [
            { month: "Jan", value: 85000 },
            { month: "Feb", value: 88000 },
            { month: "Mar", value: 92000 },
            { month: "Apr", value: 95000 },
            { month: "May", value: 98000 },
            { month: "Jun", value: 100000 },
        ],
        doctors: [
            { month: "Jan", value: 45000 },
            { month: "Feb", value: 46500 },
            { month: "Mar", value: 47500 },
            { month: "Apr", value: 48200 },
            { month: "May", value: 49500 },
            { month: "Jun", value: 50000 },
        ],
        patients: [
            { month: "Jan", value: 25000 },
            { month: "Feb", value: 26500 },
            { month: "Mar", value: 27500 },
            { month: "Apr", value: 28200 },
            { month: "May", value: 29000 },
            { month: "Jun", value: 30000 },
        ],
        appointments: [
            { month: "Jan", value: 62000 },
            { month: "Feb", value: 64000 },
            { month: "Mar", value: 65500 },
            { month: "Apr", value: 67000 },
            { month: "May", value: 68500 },
            { month: "Jun", value: 70000 },
        ],
    };

    // Bar chart data
    const barData = [
        { name: "Revenue", value: analytics.totalRevenue, growth: analytics.revenueGrowth },
        { name: "Doctors", value: analytics.doctorCount, growth: analytics.doctorGrowth },
        { name: "Patients", value: analytics.patientCount, growth: analytics.patientGrowth },
        { name: "Appointments", value: analytics.appointmentCount, growth: analytics.appointmentGrowth }
    ];

    // Pie chart data
    const pieData = [
        { name: "Revenue", value: analytics.totalRevenue, fill: "#8884d8" },
        { name: "Doctors", value: analytics.doctorCount, fill: "#82ca9d" },
        { name: "Patients", value: analytics.patientCount, fill: "#ffc658" },
        { name: "Appointments", value: analytics.appointmentCount, fill: "#ff8042" }
    ];

    // Define colors for each bar
    const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042"];

    // Custom tooltip for bar chart
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="custom-tooltip" style={{background: 'white', padding: '10px', border: '1px solid #ccc', borderRadius: '5px'}}>
                    <p className="label">{`${label}: ${payload[0].value.toLocaleString()}`}</p>
                    <p className="growth">Growth: {barData.find(item => item.name === label).growth}%</p>
                </div>
            );
        }
        return null;
    };

    const formatValue = (value) => {
        if (value >= 1000) {
            return `${(value / 1000).toFixed(1)}k`;
        }
        return value;
    };

    const handleTimeframeChange = (newTimeframe) => {
        setTimeframe(newTimeframe);
    };

    // Get current screen width for responsive adjustments
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };
        
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Responsive configurations
    const isMobile = windowWidth < 768;
    const isTablet = windowWidth >= 768 && windowWidth < 1024;

    return (
        <div style={{ 
            padding: isMobile ? '16px' : '24px', 
            fontFamily: 'Arial, sans-serif', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            width: '100%',
            maxWidth: '100vw',
            overflowX: 'hidden'
        }}>
            {/* Heading and Buttons */}
            <div style={{ textAlign: 'center', marginBottom: '32px', width: '100%' }}>
                <h2 style={{ 
                    fontSize: isMobile ? '22px' : '28px', 
                    fontWeight: 'bold', 
                    color: '#333', 
                    marginBottom: isMobile ? '12px' : '16px' ,
                    fontFamily:'Arial, Helvetica, sans-serif'
                }}>
                    Administrative Analytics Dashboard
                </h2>
                <div style={{ 
                    display: 'flex', 
                    gap: '8px', 
                    justifyContent: 'center',
                    flexWrap: isMobile ? 'wrap' : 'nowrap' 
                }}>
                    <button
                        onClick={() => handleTimeframeChange("weekly")}
                        style={{
                            padding: isMobile ? '6px 12px' : '8px 16px',
                            borderRadius: '6px',
                            background: timeframe === "weekly" ? '#4f46e5' : 'white',
                            color: timeframe === "weekly" ? 'white' : '#333',
                            border: timeframe === "weekly" ? 'none' : '1px solid #ddd',
                            cursor: 'pointer',
                            transition: 'background 0.3s ease, color 0.3s ease, border 0.3s ease',
                            fontSize: isMobile ? '14px' : '16px',
                            flex: isMobile ? '1' : 'initial',
                            fontFamily: 'Arial, Helvetica, sans-serif',
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.background = timeframe === "weekly" ? '#4f46e5' : '#f0f0f0';
                            e.target.style.color = timeframe === "weekly" ? 'white' : '#4f46e5';
                            e.target.style.border = timeframe === "weekly" ? 'none' : '1px solid #4f46e5';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.background = timeframe === "weekly" ? '#4f46e5' : 'white';
                            e.target.style.color = timeframe === "weekly" ? 'white' : '#333';
                            e.target.style.border = timeframe === "weekly" ? 'none' : '1px solid #ddd';
                        }}
                    >
                        Weekly
                    </button>
                    <button
                        onClick={() => handleTimeframeChange("monthly")}
                        style={{
                            padding: isMobile ? '6px 12px' : '8px 16px',
                            borderRadius: '6px',
                            background: timeframe === "monthly" ? '#4f46e5' : 'white',
                            color: timeframe === "monthly" ? 'white' : '#333',
                            border: timeframe === "monthly" ? 'none' : '1px solid #ddd',
                            cursor: 'pointer',
                            transition: 'background 0.3s ease, color 0.3s ease, border 0.3s ease',
                            fontSize: isMobile ? '14px' : '16px',
                            flex: isMobile ? '1' : 'initial',
                            fontFamily: 'Arial, Helvetica, sans-serif',
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.background = timeframe === "monthly" ? '#4f46e5' : '#f0f0f0';
                            e.target.style.color = timeframe === "monthly" ? 'white' : '#4f46e5';
                            e.target.style.border = timeframe === "monthly" ? 'none' : '1px solid #4f46e5';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.background = timeframe === "monthly" ? '#4f46e5' : 'white';
                            e.target.style.color = timeframe === "monthly" ? 'white' : '#333';
                            e.target.style.border = timeframe === "monthly" ? 'none' : '1px solid #ddd';
                        }}
                    >
                        Monthly
                    </button>
                    <button
                        onClick={() => handleTimeframeChange("yearly")}
                        style={{
                            padding: isMobile ? '6px 12px' : '8px 16px',
                            borderRadius: '6px',
                            background: timeframe === "yearly" ? '#4f46e5' : 'white',
                            color: timeframe === "yearly" ? 'white' : '#333',
                            border: timeframe === "yearly" ? 'none' : '1px solid #ddd',
                            cursor: 'pointer',
                            transition: 'background 0.3s ease, color 0.3s ease, border 0.3s ease',
                            fontSize: isMobile ? '14px' : '16px',
                            flex: isMobile ? '1' : 'initial',
                            fontFamily: 'Arial, Helvetica, sans-serif',
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.background = timeframe === "yearly" ? '#4f46e5' : '#f0f0f0';
                            e.target.style.color = timeframe === "yearly" ? 'white' : '#4f46e5';
                            e.target.style.border = timeframe === "yearly" ? 'none' : '1px solid #4f46e5';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.background = timeframe === "yearly" ? '#4f46e5' : 'white';
                            e.target.style.color = timeframe === "yearly" ? 'white' : '#333';
                            e.target.style.border = timeframe === "yearly" ? 'none' : '1px solid #ddd';
                        }}
                    >
                        Yearly
                    </button>
                </div>
            </div>

            {/* Metrics Cards */}
            <div style={{ 
                display: 'grid', 
                gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', 
                gap: isMobile ? '16px' : '24px', 
                marginBottom: '32px', 
                width: '100%', 
                maxWidth: '1200px' 
            }}>
                {barData.map((item, index) => (
                    <div
                        key={item.name}
                        style={{
                            background: 'white',
                            padding: isMobile ? '16px' : '24px',
                            borderRadius: '8px',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                            borderLeft: `4px solid ${COLORS[index]}`,
                            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                            cursor: 'pointer'
                        }}
                        onClick={() => setSelectedMetric(item.name.toLowerCase())}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div>
                                <p style={{ fontSize: isMobile ? '12px' : '14px', color: '#666', fontWeight: 500 }}>Total {item.name}</p>
                                <p style={{ fontSize: isMobile ? '20px' : '24px', fontWeight: 'bold', marginTop: '4px' }}>
                                    {item.name === "Revenue" ? "₹" : ""}{formatValue(item.value)}
                                </p>
                            </div>
                            <div style={{
                                padding: isMobile ? '8px' : '12px',
                                borderRadius: '50%',
                                background: `${COLORS[index]}20`
                            }}>
                                {/* Placeholder for icon */}
                                <div style={{ width: isMobile ? '16px' : '20px', height: isMobile ? '16px' : '20px' }}></div>
                            </div>
                        </div>
                        <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center' }}>
                            {item.growth > 0 ? (
                                <div style={{ display: 'flex', alignItems: 'center', color: '#10b981' }}>
                                    <span style={{ fontSize: isMobile ? '12px' : '14px', fontWeight: 500 }}>▲ {item.growth}%</span>
                                </div>
                            ) : (
                                <div style={{ display: 'flex', alignItems: 'center', color: '#ef4444' }}>
                                    <span style={{ fontSize: isMobile ? '12px' : '14px', fontWeight: 500 }}>▼ {Math.abs(item.growth)}%</span>
                                </div>
                            )}
                            <span style={{ marginLeft: '8px', fontSize: isMobile ? '10px' : '12px', color: '#666' }}>vs last {timeframe}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Trend Chart and Pie Chart */}
            <div style={{ 
                display: 'grid', 
                gridTemplateColumns: isMobile || isTablet ? '1fr' : '2fr 1fr', 
                gap: isMobile ? '16px' : '24px', 
                marginBottom: '32px', 
                width: '100%', 
                maxWidth: '1200px' 
            }}>
                {/* Trend Chart */}
                <div style={{ 
                    background: 'white', 
                    padding: isMobile ? '16px' : '24px', 
                    borderRadius: '8px', 
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    marginBottom: isMobile || isTablet ? '16px' : '0',
                    fontFamily: 'Arial, Helvetica, sans-serif'
                }}>
                    <h3 style={{ fontSize: isMobile ? '16px' : '18px', fontWeight: 600, marginBottom: '16px', color: '#333' }}>
                        {selectedMetric.charAt(0).toUpperCase() + selectedMetric.slice(1)} Trend
                    </h3>
                    <div style={{ height: isMobile ? '200px' : '250px' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={trendData[selectedMetric.toLowerCase()]}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Line
                                    type="monotone"
                                    dataKey="value"
                                    stroke={COLORS[barData.findIndex(item => item.name.toLowerCase() === selectedMetric.toLowerCase())]}
                                    strokeWidth={2}
                                    dot={{ strokeWidth: 2, r: 4 }}
                                    activeDot={{ r: 6 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Distribution Pie Chart */}
                <div style={{ 
                    background: 'white', 
                    padding: isMobile ? '16px' : '24px', 
                    borderRadius: '8px', 
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)' ,
                    fontFamily: 'Georgia, serif'
                }}>
                    <h3 style={{ fontSize: isMobile ? '16px' : '18px', fontWeight: 600, marginBottom: '16px', color: '#333' }}>Metrics Distribution</h3>
                    <div style={{ height: isMobile ? '200px' : '250px' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={isMobile ? 40 : 60}
                                    outerRadius={isMobile ? 60 : 80}
                                    fill="#8884d8"
                                    paddingAngle={2}
                                    dataKey="value"
                                    labelLine={false}
                                    label={({ name, percent }) => isMobile ? `${(percent * 100).toFixed(0)}%` : `${name} ${(percent * 100).toFixed(0)}%`}
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                {!isMobile && <Legend />}
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Bar Chart */}
            <div style={{
                background: 'white',
                padding: isMobile ? '16px' : '24px',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                marginBottom: '32px',
                width: '100%',
                maxWidth: '1200px',
                fontFamily: 'Arial, Helvetica, sans-serif'
            }}>
                <h3 style={{ fontSize: isMobile ? '16px' : '18px', fontWeight: 600, marginBottom: '16px', color: '#333' }}>Comparative Analysis</h3>
                <div style={{ height: isMobile ? '200px' : '250px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={barData} margin={{ top: 5, right: 5, left: isMobile ? -15 : 0, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                            <XAxis dataKey="name" tick={{ fontSize: isMobile ? 10 : 12 }} />
                            <YAxis tick={{ fontSize: isMobile ? 10 : 12 }} />
                            <Tooltip content={<CustomTooltip />} />
                            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                                {barData.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={COLORS[index % COLORS.length]}
                                        cursor="pointer"
                                        onClick={() => setSelectedMetric(entry.name.toLowerCase())}
                                    />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Last Updated */}
            <div style={{ 
                textAlign: 'right', 
                fontSize: isMobile ? '12px' : '14px', 
                color: '#666', 
                width: '100%', 
                maxWidth: '1200px',
                paddingRight: isMobile ? '8px' : '0'
            }}>
                Last updated: {new Date().toLocaleString()}
            </div>
        </div>
    );
};

export default AdminDashboard;