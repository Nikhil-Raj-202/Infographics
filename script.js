Sure, Nikhil! Here's a fully optimized and modular version of your Chart.js script. It improves performance, readability, and maintainability by:
- Reusing chart options and font settings
- Caching DOM elements
- Pre-wrapping labels
- Modularizing chart data creation
- Storing chart instances for future updates

✅ Optimized Chart.js Script
<script>
    // 🔧 Utility: Wrap long labels
    const wrapLabel = (label, maxWidth = 16) => {
        if (label.length <= maxWidth) return label;
        const words = label.split(' ');
        const lines = [];
        let currentLine = '';
        words.forEach(word => {
            if ((currentLine + ' ' + word).trim().length > maxWidth) {
                lines.push(currentLine.trim());
                currentLine = word;
            } else {
                currentLine = (currentLine + ' ' + word).trim();
            }
        });
        if (currentLine) lines.push(currentLine.trim());
        return lines;
    };

    // 🎯 Tooltip title formatter
    const tooltipTitleCallback = (tooltipItems) => {
        const item = tooltipItems[0];
        if (!item || !item.chart?.data?.labels) return '';
        const label = item.chart.data.labels[item.dataIndex];
        return Array.isArray(label) ? label.join(' ') : label;
    };

    // 🎨 Common font and plugin config
    const defaultFont = { family: "'Inter', sans-serif", size: 12 };
    const pluginConfig = {
        legend: {
            labels: {
                font: defaultFont,
                color: '#1E293B',
            }
        },
        tooltip: {
            titleFont: defaultFont,
            bodyFont: defaultFont,
            callbacks: { title: tooltipTitleCallback }
        }
    };

    // 📦 Base chart options
    const chartDefaults = {
        plugins: pluginConfig,
        maintainAspectRatio: false,
    };

    // 🍩 Doughnut chart options
    const doughnutOptions = {
        ...chartDefaults,
        cutout: '70%',
    };

    // 🧱 Chart data builder
    const doughnutData = (labels, data, colors) => ({
        labels,
        datasets: [{
            data,
            backgroundColor: colors,
            borderColor: colors,
            borderWidth: 1
        }]
    });

    // 📌 Cache canvas elements
    const canvasElements = {
        rote: document.getElementById('roteLearningChart'),
        holistic: document.getElementById('holisticFocusChart'),
        shifts: document.getElementById('shiftsChart'),
        challenges: document.getElementById('challengesChart')
    };

    // 📊 Chart instances
    const charts = {};

    // Rote Learning Chart
    charts.roteLearning = new Chart(canvasElements.rote.getContext('2d'), {
        type: 'doughnut',
        data: doughnutData(['Rote Memorization', 'Other Skills'], [75, 25], ['#00529B', '#F2F2F2']),
        options: doughnutOptions
    });

    // Holistic Focus Chart
    charts.holisticFocus = new Chart(canvasElements.holistic.getContext('2d'), {
        type: 'doughnut',
        data: doughnutData(
            ['Critical Thinking', 'Vocational Skills', 'Creativity', 'Core Academics'],
            [30, 25, 20, 25],
            ['#00A1E4', '#F7941D', '#FDB913', '#00529B']
        ),
        options: doughnutOptions
    });

    // Shifts Chart
    const shiftLabels = ['Learning Approach', 'Assessment Method', 'Curriculum Structure', 'Teacher Role', 'Skill Focus'];
    const wrappedShiftLabels = shiftLabels.map(wrapLabel);

    charts.shifts = new Chart(canvasElements.shifts.getContext('2d'), {
        type: 'bar',
        data: {
            labels: wrappedShiftLabels,
            datasets: [
                {
                    label: 'Traditional Approach',
                    data: [7, 8, 9, 8, 6],
                    backgroundColor: '#00529B',
                    borderRadius: 4,
                },
                {
                    label: 'NCF-SE 2023 Vision',
                    data: [10, 9, 8, 9, 10],
                    backgroundColor: '#00A1E4',
                    borderRadius: 4,
                }
            ]
        },
        options: {
            ...chartDefaults,
            indexAxis: 'y',
            scales: {
                x: { display: false, max: 10 },
                y: {
                    grid: { display: false },
                    ticks: {
                        font: { ...defaultFont, size: 14, weight: '600' },
                        color: '#1E293B'
                    }
                }
            },
            plugins: {
                ...pluginConfig,
                legend: { position: 'top' }
            }
        }
    });

    // Challenges Chart
    const challengeLabels = ['Teacher Training Capacity', 'Resource Constraints', 'Infrastructure Gaps', 'Assessment Reform', 'Community Buy-in'];
    const wrappedChallengeLabels = challengeLabels.map(wrapLabel);

    charts.challenges = new Chart(canvasElements.challenges.getContext('2d'), {
        type: 'radar',
        data: {
            labels: wrappedChallengeLabels,
            datasets: [{
                label: 'Challenge Magnitude',
                data: [9, 8, 8, 7, 6],
                backgroundColor: 'rgba(0, 161, 228, 0.2)',
                borderColor: '#00A1E4',
                pointBackgroundColor: '#00A1E4',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: '#00A1E4'
            }]
        },
        options: {
            ...chartDefaults,
            scales: {
                r: {
                    angleLines: { color: '#d1d5db' },
                    grid: { color: '#e5e7eb' },
                    pointLabels: {
                        font: { ...defaultFont, weight: '500' },
                        color: '#1E293B'
                    },
                    ticks: {
                        backdropColor: 'transparent',
                        color: '#64748b'
                    },
                    suggestedMin: 0,
                    suggestedMax: 10
                }
            },
            plugins: {
                ...pluginConfig,
                legend: { display: false }
            }
        }
    });
</script>

