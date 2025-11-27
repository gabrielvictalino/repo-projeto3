
function initializeFeedbackPage() {
    setupDarkMode();
    
    
    const feedbackContent = document.getElementById('feedbackContent');
    const errorContent = document.getElementById('errorContent');
    
    if (feedbackContent && !feedbackContent.classList.contains('hidden')) {
        initializeCharts();
    }
}

function initializeCharts() {
    createBarChart(feedbackData.barChartData);
    createPieChart(feedbackData.pieChartData);
}

function createBarChart(data) {
    const barChart = document.getElementById('barChart');
    if (!barChart) return;
    
    barChart.innerHTML = '';
    
    const maxValue = Math.max(...data.map(item => item.value));
    
    data.forEach(item => {
        const barHeight = (item.value / maxValue) * 100;
        
        const bar = document.createElement('div');
        bar.className = 'bar';
        bar.style.height = `${barHeight}%`;
        
        const value = document.createElement('div');
        value.className = 'bar-value';
        value.textContent = `${item.value}%`;
        
        const label = document.createElement('div');
        label.className = 'bar-label';
        label.textContent = item.label;
        
        bar.appendChild(value);
        bar.appendChild(label);
        barChart.appendChild(bar);
        
      
        setTimeout(() => {
            bar.style.height = `${barHeight}%`;
        }, 100);
    });
}

function createPieChart(data) {
    const pieChart = document.getElementById('pieChart');
    const pieLegend = document.getElementById('pieLegend');
    
    if (!pieChart || !pieLegend) return;
    
   
    let gradientString = '';
    let currentPercent = 0;
    
    data.forEach((item, index) => {
        const nextPercent = currentPercent + item.value;
        gradientString += `${item.color} ${currentPercent}% ${nextPercent}%`;
        if (index < data.length - 1) gradientString += ', ';
        currentPercent = nextPercent;
    });
    
    pieChart.style.background = `conic-gradient(${gradientString})`;
    
   
    pieLegend.innerHTML = '';
    data.forEach(item => {
        const legendItem = document.createElement('div');
        legendItem.className = 'legend-item';
        
        const colorBox = document.createElement('div');
        colorBox.className = 'legend-color';
        colorBox.style.backgroundColor = item.color;
        
        const label = document.createElement('span');
        label.textContent = `${item.label} (${item.value}%)`;
        
        legendItem.appendChild(colorBox);
        legendItem.appendChild(label);
        pieLegend.appendChild(legendItem);
    });
}

function setupDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (!darkModeToggle) return;
    
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        darkModeToggle.textContent = 'Modo Claro';
    }
    
    darkModeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('darkMode', 'true');
            darkModeToggle.textContent = 'Modo Claro';
        } else {
            localStorage.setItem('darkMode', 'false');
            darkModeToggle.textContent = 'Modo Noturno';
        }
    });
}


function goToHomePage() {
    window.location.href = '/home';
}

function goToQuestionnaire() {
    window.location.href = '/questionario';
}

function viewDetailedResults() {
    window.location.href = '/resultados-detalhados';
}

function viewNotifications() {
    window.location.href = '/notificacoes';
}

function logout() {
    
    localStorage.removeItem('darkMode');
    
    
    window.location.href = '/login';
}

window.initializeFeedbackPage = initializeFeedbackPage;
window.createBarChart = createBarChart;
window.createPieChart = createPieChart;
window.setupDarkMode = setupDarkMode;
window.goToHomePage = goToHomePage;
window.goToQuestionnaire = goToQuestionnaire;
window.viewDetailedResults = viewDetailedResults;
window.viewNotifications = viewNotifications;
window.logout = logout;
