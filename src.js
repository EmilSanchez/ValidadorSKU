const exampleData = `B0CDVS3VH8
B0D37KBB3X
B07YLZ48T6
B0C4DVTYWL
B0DTFPKZ7W
B07R2N871N
B0CF93JDM2`;

function validateASINs() {
    const input = document.getElementById('asinInput').value.trim();
    const resultsDiv = document.getElementById('results');
    
    if (!input) {
        resultsDiv.innerHTML = `
            <div class="result-card error">
                <div class="result-title">
                    <span class="icon">⚠</span>
                    Error de Entrada
                </div>
                <p>Por favor, introduce algunos códigos ASIN para validar.</p>
            </div>
        `;
        return;
    }
    
    // Procesar los códigos
    const lines = input.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    const asinCount = {};
    const duplicates = {};
    
    // Contar ocurrencias
    lines.forEach(asin => {
        if (asinCount[asin]) {
            asinCount[asin]++;
            duplicates[asin] = asinCount[asin];
        } else {
            asinCount[asin] = 1;
        }
    });
    
    const totalCodes = lines.length;
    const uniqueCodes = Object.keys(asinCount).length;
    const duplicateCount = Object.keys(duplicates).length;
    const duplicateInstances = Object.values(duplicates).reduce((sum, count) => sum + count, 0) - duplicateCount;
    
    // Generar resultados
    let resultsHTML = '';
    
    // Estadísticas generales
    resultsHTML += `
        <div class="result-card ${duplicateCount > 0 ? 'warning' : 'success'}">
            <div class="result-title">
                <span class="icon">${duplicateCount > 0 ? '⚠' : '✓'}</span>
                Resumen de Validación
            </div>
            <div class="stats-grid">
                <div class="stat-item">
                    <span class="stat-number">${totalCodes}</span>
                    <div class="stat-label">Total de Códigos</div>
                </div>
                <div class="stat-item">
                    <span class="stat-number">${uniqueCodes}</span>
                    <div class="stat-label">Códigos Únicos</div>
                </div>
                <div class="stat-item">
                    <span class="stat-number">${duplicateCount}</span>
                    <div class="stat-label">Códigos Duplicados</div>
                </div>
                <div class="stat-item">
                    <span class="stat-number">${duplicateInstances}</span>
                    <div class="stat-label">Duplicados Extra</div>
                </div>
            </div>
        </div>
    `;
    
    // Mostrar duplicados si los hay
    if (duplicateCount > 0) {
        const sortedDuplicates = Object.entries(duplicates).sort((a, b) => b[1] - a[1]);
        
        resultsHTML += `
            <div class="result-card warning">
                <div class="result-title">
                    <span class="icon"></span>
                    Códigos Duplicados Encontrados
                </div>
                <p>Se encontraron <strong>${duplicateCount}</strong> códigos ASIN que aparecen más de una vez:</p>
                <div class="duplicate-list">
        `;
        
        sortedDuplicates.forEach(([code, count]) => {
            resultsHTML += `
                <div class="duplicate-item">
                    <span class="duplicate-code">${code}</span>
                    <span class="duplicate-count">${count} veces</span>
                </div>
            `;
        });
        
        resultsHTML += `
                </div>
                <p style="margin-top: 15px; font-size: 0.9rem; color: #666;">
                    💡 <strong>Consejo:</strong> Elimina las repeticiones para evitar problemas en tu gestión de productos.
                </p>
            </div>
        `;
    } else {
        resultsHTML += `
            <div class="result-card success">
                <div class="result-title">
                    <span class="icon">✓</span>
                    ¡Excelente! No hay duplicados
                </div>
                <p>Todos los códigos ASIN en tu lista son únicos. No se encontraron duplicados.</p>
                <p style="margin-top: 10px; color: #4caf50; font-weight: 600;">Tu lista contiende Asins unicos!.</p>
            </div>
        `;
    }
    
    resultsDiv.innerHTML = resultsHTML;
}

function clearInput() {
    document.getElementById('asinInput').value = '';
    document.getElementById('results').innerHTML = '';
}

function loadExample() {
    document.getElementById('asinInput').value = exampleData;
    validateASINs();
}

// Auto-validar cuando se pega contenido
document.getElementById('asinInput').addEventListener('paste', function() {
    setTimeout(validateASINs, 100);
});