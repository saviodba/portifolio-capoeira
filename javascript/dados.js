function loadingConfig(){
          // Mobile menu toggle
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
        
        // Close mobile menu when clicking on links
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
        
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
        
        // Add scroll effect to navigation
        window.addEventListener('scroll', () => {
            const nav = document.querySelector('nav');
            if (window.scrollY > 100) {
                nav.classList.add('bg-white/98');
                nav.classList.remove('bg-white/95');
            } else {
                nav.classList.add('bg-white/95');
                nav.classList.remove('bg-white/98');
            }
        });
        
        // Animate cards on scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        // Observe all cards
        document.querySelectorAll('.card-hover').forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(card);
        });
}

function carregarDados() {

  fetch('https://saviodesenv.alwaysdata.net/',
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json', 
      }      
    })
    .then(response => response.json())
    .then(data => { 
        console.log(data);               
        document.querySelector('p[name="nome"]').textContent = data.nome;
        document.querySelector('p[name="sobreSubtitulo"]').textContent = data.sobre.subtitulo;
        document.querySelector('h3[name="sobreTitulo"]').textContent = data.sobre.titulo;
        document.querySelector('div[name="tempoExperiencia"]').textContent = data.tempoExperiencia;
        document.querySelector('div[name="alunoFormados"]').textContent = data.alunosFormados;
        document.querySelector('p[name="textoIntrodutorio"]').textContent = data.dadosdogrupo.textoIntroducao;                
        document.querySelector('span[name="siglaNomeGrupo"]').textContent = data.dadosdogrupo.sigla;                
        document.querySelector('h3[name="nomeGrupo"]').textContent = data.dadosdogrupo.nome;
        document.querySelector('p[name="fundadopor"]').textContent = `Fundado pelo ${data.dadosdogrupo.fundador}`;                                
        document.getElementById('nome').textContent = data.nome;
        document.getElementById('subtitulo').textContent = data.subtitulo;
        document.getElementById('descricao').textContent = data.descricao;

        data.dadosdogrupo.paragrafos.forEach((paragrafo, index) => {
            document.getElementById('paragrafosSobreGrupo').innerHTML += `<p class="text-gray-600 mb-4">${paragrafo}</p>`;
        });

        data.sobre.paragrafos.forEach((paragrafo, index) => {
            document.getElementById('sobreParagrafos').innerHTML += `<p class="text-gray-600 mb-4">${paragrafo}</p>`;
        });             

        data.dadosdogrupo.valores.forEach((valor, index) => {
            document.getElementById('valoresGrupo').innerHTML += `<li class="flex items-start space-x-3"><i class="fas fa-check text-green-500 mt-1"></i><span>${valor}</span></li>`;
        });

        data.dadosdogrupo.graduacoes.forEach((graduacao, index) => {   
            document.getElementById('sistema-graduacoes').innerHTML += `
                <div class="mb-12">
                    <h3 class="text-2xl font-bold text-center text-gray-900 mb-8">
                        <span class="bg-red-100 text-red-800 px-4 py-2 rounded-full">${graduacao.grupo}</span>
                    </h3>
                    
                    <div class="flex justify-center flex-wrap">
                        ${graduacao.definicoes.map(definicao => `                                                                      
                            <div class="card-hover bg-white rounded-2xl p-8 m-3 shadow-lg w-80">
                                <div class="text-center mb-4">                                            
                                    <div class="w-16 h-4 bg-gray-300 rounded-full mx-auto mb-3 relative">
                                        <div class="${definicao.cor}"></div>
                                    </div>
                                    <h3 class="text-xl font-bold text-gray-900">${definicao.graduacao}</h3>
                                    <p class="text-red-600 font-semibold"></p>
                                </div>
                                <ul class="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
                                    ${definicao.responsabilidades.map(responsabilidade => `                                                
                                        <li>${responsabilidade}</li>
                                    `).join('')}
                                </ul>
                            </div>
                            
                        `).join('')}
                    </div>
                </div> 
            `;
        });
        

        data.galeria.forEach((foto, index) => {   
            document.getElementById('galeria-fotos').innerHTML += `

                <div class="card-hover bg-gradient-to-br from-orange-100 to-yellow-100 rounded-2xl p-8 aspect-square flex items-center justify-center overflow-hidden">
                    <div class="text-center">
                        <img src="${foto.url}" alt="${foto.url}" class="w-full h-56 object-cover transform hover:scale-105 transition-transform duration-300 object-top">
                        <p class="text-gray-600 font-semibold">${foto.titulo}</p>
                        <p class="text-sm text-gray-500">${foto.descricao}</p>
                    </div>
                </div>

            `;
        });
        
    })
    .catch(error => console.log('Error fetching data:', error));

}

loadingConfig();
carregarDados();
