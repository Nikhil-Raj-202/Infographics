 <script>
        const wrapLabel = (label, maxWidth = 16) => {
            if (label.length <= maxWidth) {
                return label;
            }
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
            if (currentLine) {
                lines.push(currentLine.trim());
            }
            return lines;
        };
        
        const tooltipTitleCallback = (tooltipItems) => {
            const item = tooltipItems[0];
            let label = item.chart.data.labels[item.dataIndex];
            if (Array.isArray(label)) {
                return label.join(' ');
            }
            return label;
        };

        const chartDefaults = {
            plugins: {
                legend: {
                    labels: {
                        font: {
                            family: "'Inter', sans-serif",
                            size: 12,
                        },
                        color: '#1E293B',
                    }
                },
                tooltip: {
                    titleFont: { family: "'Inter', sans-serif" },
                    bodyFont: { family: "'Inter', sans-serif" },
                    callbacks: {
                        title: tooltipTitleCallback
                    }
                }
            },
            maintainAspectRatio: false,
        };

        const roteLearningCtx = document.getElementById('roteLearningChart').getContext('2d');
        new Chart(roteLearningCtx, {
            type: 'doughnut',
            data: {
                labels: ['Rote Memorization', 'Other Skills'],
                datasets: [{
                    data: [75, 25],
                    backgroundColor: ['#00529B', '#F2F2F2'],
                    borderColor: ['#00529B', '#F2F2F2'],
                    borderWidth: 1
                }]
            },
            options: { ...chartDefaults, cutout: '70%' }
        });

        const holisticFocusCtx = document.getElementById('holisticFocusChart').getContext('2d');
        new Chart(holisticFocusCtx, {
            type: 'doughnut',
            data: {
                labels: ['Critical Thinking', 'Vocational Skills', 'Creativity', 'Core Academics'],
                datasets: [{
                    data: [30, 25, 20, 25],
                    backgroundColor: ['#00A1E4', '#F7941D', '#FDB913', '#00529B'],
                    borderColor: ['#00A1E4', '#F7941D', '#FDB913', '#00529B'],
                    borderWidth: 1
                }]
            },
            options: { ...chartDefaults, cutout: '70%' }
        });

        const shiftsCtx = document.getElementById('shiftsChart').getContext('2d');
        const shiftLabels = ['Learning Approach', 'Assessment Method', 'Curriculum Structure', 'Teacher Role', 'Skill Focus'];
        new Chart(shiftsCtx, {
            type: 'bar',
            data: {
                labels: shiftLabels.map(label => wrapLabel(label)),
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
                    x: {
                        display: false,
                        max: 10,
                    },
                    y: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            font: {
                                family: "'Inter', sans-serif",
                                size: 14,
                                weight: '600'
                            },
                            color: '#1E293B'
                        }
                    }
                },
                plugins: {
                    ...chartDefaults.plugins,
                    legend: {
                        position: 'top',
                    },
                }
            }
        });

        const challengesCtx = document.getElementById('challengesChart').getContext('2d');
        const challengeLabels = ['Teacher Training Capacity', 'Resource Constraints', 'Infrastructure Gaps', 'Assessment Reform', 'Community Buy-in'];
        new Chart(challengesCtx, {
            type: 'radar',
            data: {
                labels: challengeLabels.map(label => wrapLabel(label)),
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
                            font: {
                                family: "'Inter', sans-serif",
                                size: 12,
                                weight: '500'
                            },
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
                    ...chartDefaults.plugins,
                    legend: {
                        display: false
                    },
                }
            }
        });
    </script>
