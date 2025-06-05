// votar ao topo
window.addEventListener('scroll', function () {
    const btn = document.getElementById('backToTop');
    if (window.scrollY > 300) {
        btn.style.display = 'block';
    } else {
        btn.style.display = 'none';
    }
});

document.getElementById('backToTop').addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// mudar tema
function toggleTheme() {
    document.body.classList.toggle('light-theme');
    const isLight = document.body.classList.contains('light-theme');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    const btn = document.getElementById('themeToggle');
    if (btn) btn.textContent = isLight ? '☀️' : '🌙';
}

window.addEventListener('DOMContentLoaded', function () {
    // tema
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
    } else {
        document.body.classList.remove('light-theme');
    }
    const btn = document.getElementById('themeToggle');
    if (btn) {
        btn.textContent = document.body.classList.contains('light-theme') ? '☀️' : '🌙';
    }

    // idioma inicial
    let lang = 'pt';
    if (typeof localStorage !== 'undefined' && localStorage.getItem('lang')) {
        lang = localStorage.getItem('lang');
    }
    setLanguage(lang);

    // carrossel 1
    if (document.getElementById('personagemImg')) {
        atualizarCarrosselPersonagem(lang);
        document.getElementById('prevPersonagem').onclick = function () {
            personagemAtual = (personagemAtual - 1 + personagens.length) % personagens.length;
            atualizarCarrosselPersonagem(lang);
            setLanguage(lang);
        };
        document.getElementById('nextPersonagem').onclick = function () {
            personagemAtual = (personagemAtual + 1) % personagens.length;
            atualizarCarrosselPersonagem(lang);
            setLanguage(lang);
        };
    }

    // carrossel 2
    if (document.getElementById('personagemImg2')) {
        atualizarCarrosselPersonagem2(lang);
        document.getElementById('prevPersonagem2').onclick = function () {
            personagemAtual2 = (personagemAtual2 - 1 + personagens2.length) % personagens2.length;
            atualizarCarrosselPersonagem2(lang);
            setLanguage(lang);
        };
        document.getElementById('nextPersonagem2').onclick = function () {
            personagemAtual2 = (personagemAtual2 + 1) % personagens2.length;
            atualizarCarrosselPersonagem2(lang);
            setLanguage(lang);
        };
    }
});

// carrossel 1
const personagens = [
    {
        nome: {
            pt: "Max Payne",
            en: "Max Payne",
            es: "Max Payne"
        },
        img: "https://preview.redd.it/a9k6070ie0s81.jpg?auto=webp&s=c8e03289eb58ab18e305b51243131c890e5c93c3",
        texto: {
            pt: "Max Payne é o protagonista titular da série de videogames de mesmo nome. Ele também é referenciado em Alan Wake e na série Grand Theft Auto. Max Payne foi dublado em todas as três partes do jogo por James McCaffrey.",
            en: "Max Payne is the titular protagonist of the video game series of the same name. He is also referenced in Alan Wake and the Grand Theft Auto series. Max Payne was voiced in all three parts of the game by James McCaffrey.",
            es: "Max Payne es el protagonista titular de la serie de videojuegos del mismo nombre. También es referenciado en Alan Wake y en la serie Grand Theft Auto. Max Payne fue doblado en las tres partes del juego por James McCaffrey."
        }
    },
    {
        nome: {
            pt: "Mona Sax",
            en: "Mona Sax",
            es: "Mona Sax"
        },
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQwcD3CB-2zHC4QaI-jha3lg29PfjJ_jOh4Q&s",
        texto: {
            pt: "Mona Sax é uma personagem importante no jogo Max Payne 1. Ela é uma mulher misteriosa e habilidosa, envolvida no mundo do crime. Mona é descrita como uma assassina profissional, que tem uma relação complicada com Max Payne, o protagonista do jogo.",
            en: "Mona Sax is an important character in Max Payne 1. She is a mysterious and skilled woman involved in the criminal world. Mona is described as a professional assassin who has a complicated relationship with Max Payne, the game's protagonist.",
            es: "Mona Sax es un personaje importante en Max Payne 1. Es una mujer misteriosa y habilidosa, involucrada en el mundo del crimen. Mona es descrita como una asesina profesional que tiene una relación complicada con Max Payne, el protagonista del juego."
        }
    },
    {
        nome: {
            pt: "Vladimir Lem",
            en: "Vladimir Lem",
            es: "Vladimir Lem"
        },
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjOjo-lNLBdJJ0_7oOauRrCvwrO0sxeXKzcw&s",
        texto: {
            pt: "Vladimir Lem é um personagem do jogo Max Payne 1. Ele é um mafioso russo e um dos antagonistas que Max Payne enfrenta ao longo da trama.",
            en: "Vladimir Lem is a character in Max Payne 1. He is a Russian mobster and one of the antagonists that Max Payne faces throughout the story.",
            es: "Vladimir Lem es un personaje del juego Max Payne 1. Es un mafioso ruso y uno de los antagonistas que Max Payne enfrenta a lo largo de la trama."
        }
    },
    {
        nome: {
            pt: "Nicole Horne",
            en: "Nicole Horne",
            es: "Nicole Horne"
        },
        img: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxISEhUSEBAVEhMVEBASFhAQFxUVFRUYFRUWFxUVFRYYHSggGBolGxUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OFRAQFSsdFR0rLSstKysrKystLS0rKy0tKzcrKy0tOC0tLSs3LTcrLS0tLS0tKy0rLSstNysrLSstK//AABEIAOEA4AMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAAAQIDBAUGBwj/xAA5EAABAwIFAgQEBAUEAwEAAAABAAIRAyEEBRIxQVFhBiJxgRMykaFCscHRByNSYuEUM3LwgpLxFf/EABgBAQEBAQEAAAAAAAAAAAAAAAABAwIE/8QAIBEBAQACAwEBAAMBAAAAAAAAAAECEQMhMUFREjJxIv/aAAwDAQACEQMRAD8A45rDtxyrTh0B0hUsFVLmNLtyGn1kXV0O4Nl05N+FJDogjjqp9PPtHCRv7J9IW9jugSHDid04E8fRK5vodrpA3+4Nv9UDnz9kj7NndPLZTqthcSOwlBFhKwdcdpA6qyad9+ZUb2imA4gBt/UrnsfnpcXBo0t6lc26dTHbbxGNpsNyf+LbrMxWdM4ZMckx7rmq+PdNrd9yqjnE3lc22u/44x1H/wC8J8paJ7En68qWhnV5kD2MFcmCVPTrQZ3XN3+upr8dpRzcO4ZMbmbK/l+IkTUjezmmfqFxlLEhaGExpm2/2XFzzjr+GNdhRqU7wR72ThSBu0991iYPF6t4aY9ipH5w1jgHGQYurjy79c5cWvG0adweibUZf/tktGsHDUDInhS02SVtGNNHcqTSLXF09lExb7p+CY0iHABwJF/zVREynf5o+ql0tFy7ZWTRAvEhQOog3ABCgiIkzeI5UbmcKxUaZ+W0cQoqjYPA91RTImPXdQClcyb9FdLOVWqCHk8EKjkMsLtDJAALGxe5t0V9lW0C8H3Wdl9SKbJbPkbBPAjhWmlttJk3kdP3RVylU5mLbfqpDUOw55VVom4P2UtE3/dEXdIBTnUQ75gCOAig+TJ378rRo4fVF4QU2YcAC59lLVhgLnfKBMnk9lNiC1gJnbeVyGdZtqcWzIE2Gwnhc5Zad447/wAV80zR1QkkwLwOywsRXkp1RxPKruhcSNLTXDlMJS1DKjAXTg8VCnseVWAurFATZSrF7DmbLbwGGMAnnZVsowEwTyYjsu3ybLw91wABAAXn5M/j0Y49brOoZPUtpbPqqOZZNUnUREWXtWR5NTIkjpb05Uef5G1oLmtlu5Czm/TcvTyDI3uovAc6Wk3HHqF2jgAJA1A7R0XDZ3VFCu4NHlPmHbsukyTMddINJuAIK34sv1jy4dbjW+HzCijSZAvzOyVlcExq9P8ACiqvXoYL2FeOoJmYCSoAASAR/lZ5JFwduic7EOIg3vugmfVMSRKifVtJBNuFBrHofVI55Gx/JUGsbd5UGMbaRvKc4kXRVIjsg4nLXlopkRJYAJvPUKxUaGk9byIiCoctpNcynBjyDUT+HqVbzOnS2pOLgI853ceY7KKh1232UzMRq/dVsO2R5zH9ovypGMggRv8AZBdpVCDY25n9FoYbGuAuYPUbLLYppgSCDHBTZpJj8zApuJIdEaQblzjyR0C4us7e9yZJ9d1fzLFFzjaOIWVWcFl7dttaiB71HKVybC7cAmFCVI4pA1AgV/L6BcbKtQZJgLrckykjjzEbLPPLTTjx2v5XQtEbACf2XYZS0iCGxsqWX4PSL2jj1WzgqobYiJ2JXlvb0Xx2uRVCGtIE772stbGU/iMLS03EcLGynMqOlv8AMaCeJXR0SCAQbdQu8WGT5o8atb8Uhrrse9sdgeUzw/mGhzWOPlJEHp1CqZ68f6iudU/z60A8eYrOwj/NPQgwtZNRfXpnxhPPYhD625Wfh6kiwi1gUrHnY2W8u5t57NXSyK0jon6gZuW9wogeyCOyrlIWDl+oILdo77lM1WiAgOttt0VDS08n7ILLG9u9lOwEqYUhyUHn+X6Q1umZNNoiYvG6mr0HQQ6TPAtCiyemC1oJAOkQ48W3V34fmhlQEDcmw63CjoykwAC1ohWMRQLBE7ix4/yoKt4gfsVOwtLf5jpDdm3mTdA1lTbXPH/xMxtcGXmzWkgAcnlPox177XVDMqthaztTpNu23VZ5340wnbIrPkn1Kp1rKxUMGFTxBukXJGT0SAE2QXcLqvBeVsqvl41adhx6lMstRzJusE4RrB5j5v6QqrwCYuvV6/hak46w4tfcXAICxMV4Jc1xcHif+JCznJPrS4X4zPC2Aoue2CdROxAiV6hhcm0MDtN+T1XKeF/DtQPu3YgyPVep08I6BIOwusMrutfJp59neINHc6RJg+35rzzMM1OoxVe/+4kheofxJyOo5rSxpdBdYd+V5fh/DtV0gtcJ6yJXeGp3aZW3xbyHOWsdLnOJJ/CZt/xO69w8I5kamHOlxLQbTuO68hyr+HNeoRpIkbGYE+q9m8EeHnYSkWOO4Eje/N1Mtb3HFt12+ec9GitVbcH49Sf/AGKq4SpLh67hWfG1sdiWySBXePNc7rPwBW+umeN7eiUKkU2umYcGKZziqGTNIw+5kVAZN7dFbL+9uqcV6sTlnaWmeBPO6lw7LeY87KvTsdzEKan0G62jKrGqTHCeAPX0UDxHMwlFW1tyqi5RpmLNHuVYpYbVv9tlSovqHkR0j9VpUKtgCRtCg8uo0LUyCZNNkAiBtx19VpNwwElxcOABeT3WXh9QY0wS5rW7SVdqVTUIJBbtY/N7qOlim9oaQQbix7hNrNOkFvI4P6J7iSLTA3j9VZw+J0BzReQALD/sKiEYYlokGLTpiYWTmz9QAHyskAFX62KLATME2gdVi4oy0jvussu62w/qoAXndQVnKRzo2UNRnK6cWoiu38AVvmZ3DjK4Um66jwdVLaotbvtZc8ni4evZcHg277kjfjbgKWnlwduJvymYGvqFzwNk3M8YWNOkmw6ry16JGxgjRYdAI1dAtlr4iR9l5zgK1amDVZT1vJgNJgQeVt4vPqsMloY7ctBmPflPhcXY5kaYYHVIiFw+Y4Km466Wx6JM08ZVH0nU34ZxZp/3RI4sQFzuQ5sXmIO5PWyZGOFjrcrqllhG63cVnAoUKlVxEU6bnW3kCyx8E3UZA5XOfxZzn4OE+A0nXWMf+I3UwnbnJ4hmWJdVqPqPMue9zyT3MpcJU0ndQVzdOwwvK9vxhL29FyB+qkQT5SOFJSN7cEqn4TBNMtJiJInkFTtdvuLmwWXH1bHfJ3ItB/upA7meOFULzaRPHspb8L0RidWrkiI6X3urNNwtfhVGsJ34NgpGElVGrSdax6KwHGwWdQdaVpU22BmyiOBDnCLwJkBqsPo86wSbwd040AR7/KU/4YI3EztG3uopw1Nb80apnmY7KqKoIJm87EcBXcMWj52aoHBuocVQaPONjeDdw7FUUM3qAsa8CLxEQsh5DpAt2W/Ta1zXfEJvEAj7qqMqa7zU3WHBXFjSZOaqJhut/McncHHyyY1FrQIAItB/RZBw723AMKCk8LTyd3mAk8bLPe3sr+WOIcIA3lMvFx9eyeGKmumCNtp9FfDWvqREjmdlzWRYksZExq27LdwWXNLP5hL9TiYM2Xjr1NTG5hh6QEvYI4kLDxOeYZ7w8VmW7qvnPh6i4WYZ66v3WE7w4JsIHdXp1Mcf122AzrCVAGfFadrTH5rFx2HFCufhxpdcAbHqFXyzw5hiYe0k7apI+0qXN8l+G5hpOJaDGkyf+jsp0nUrqskxhLSSIETK8l/ilm3xsSASCGNgAcT1XoGPzQYfCueRdtO0ck7BeH46u57y95kucSfdacOP1hyVTJkq1hackDqU2hh9RtZauFw+k+W+wJ9ei9GVZ4x0/h61QO0ksYxznHYC0NB9Vce4zJHMwO/Cr4F+hhYPxEan+n4Qn6pPuueKe05KlcBPS2yk03EJhYB3lTQdwNgtmZrwoqTTdWGvG+/VSll7QqiTAEERyttrQIbuYCxsCyHgbS7cLZF6m9g6J7xsojjnAHgDbZM0aDpAkQbuvurBBF4nqmucSbiPXoiqzqHQ+qf8PTMXkWLlO4JlGoCPNY9EFYU2i5Fwq73dYHv9FoEgHbVJixiO/dMqNBvHuEVEzECwc4SBA4PujF02uaAW6788Dsd0rgyQdIm91MH2A26dUNsh+Qs3uAbiDJ95VjLPD1PV8znesfor9VpbIdBsOVBg8YNYY0idQkjpN4K5ynSyu8wGROp02VHt+vFuVr0azABNuy6CnSBosLZ0mmNz2XOYnBEugCOnReLL16cbtTzPEgmwsqLMUGm6zfETix4DbwLgrnmNrVDqDHH2MD0lTTSPQqGIpG5gX7QlqVmOdAOoWiP0XGYOoac6jvx0XTZGQRLZJMXPHouUs05r+Kby2nSpiQHukjaY2XA0suqOPyTG87LtP4r4xr61KkJ8jHHX6nhcfh84qNgB0gGYP5yvZxT/AJeXO9rmFyeLON+Q3hXsJQp0zDW6nd7lS0cdSqG1jEngyrLKAeSQ2CBxJJWmnGzGOvtbopKLD/gJGN9Z2VoUiflsfz9VQ2jXJdBBkfT27q3qtuqugcmCOFJRa719UD6FO56FaAw8WBn1UdBvK0WRHtuqiuGFpa9onTMj81oNqNe3fcjsQRe6iYJ2S16PLLOnbh3qiOfcwmALgfdRYhhi5gKYgt2NvVDGB0TdUVHgkdoTaVKbdlqPwwI8pv1t9EtDCQLi8EEvIb9lFU24MDd244Sf6ETGwPQ3RiMVQpka6jQ0f3SfSAszD+LcMzU6oHVHajpaBYN4MlBo/wCj0/NYdSmYiqym3W46W/1GPsFhZh41LzNOiB3f+gC53G5i+q7VUdJ+w9Ag3Myzk1Dpp+VnXYuWYysZg26Qsw1kCsubNuo+iP4dZ86vgIcZqU3Cm6Tt0utsVpNyPzXgvgzxA7C1dW9Jwio3t/V6heuU8c3SH06k03AEECbLy8k1W2CHPcC1z9VjJlUH0oETIMW6LRrVdYBme+yibhXPs3c8LNrGW3L2vd5mzH2V2ti2YemXGGtA322WriaLcPRLnnYST17BeTeLM1e8+c+U/IwbDue6uOO6mWXTI8S5w7EVnVTYEw0dGjYLGNRJXeSUxreV7JNR5akpYkg7+/K6DLPEDm2JJmBI3XO6LXSsK6R3FLMmESHaRvfeysMx1OATUG8kAiVwJqO9EnxnDlB6bhqjXCdTdpgkSp2mRAA6ry9uIPKtUc1eBDajh6FNo9SwpnkDlXsOAdjvwvMsJ4oxAgamuA4cFuYDxsG/7lHiDo/RXY71mHjaBZHwpPPqFjYDxJQrCKbwHR8ryAZ6XXQ4EB7bA6uR+voiOGxuZUqdy+APw7k+wWTiPGIbanRDu7zA+i4ypiJTNSLpuY7xVXqR5gwD8LLLKxGPq1DL3ud6klVoTiYUUhnp9UnqUSkJQK0pTTSAKZoQRCnO31TCIUxlNegs5dUIcPovT/AuJLmPoOMhvmHYHheT0SQV6P4JxHw6YI3N3E7lYc3jbjdphsOWkgCy6XJ8KGAv5N/RYmD1EavmuLdVrOxelp4jk7LztaxvFjhUlrnQ0Dbib3K8c8UYljnBrBdsguGxK7rxXj3ObUaDpbJLnzcjoOi8txr5NtgtuLHd245LqaQH0Ssakbsl+IB6r0MCuSalG98psoJS9MBTUKona6UPp9FE16c1yBzSQnCqeqQpCglZiSO62sn8RV6TppVXNPQmR9CueNM9EtOoQiI9KSU9xTCilD0EpqEDtSSUJEDgVK2p1UKEFowdkx7eqhBPCeKqmgMN12XhDGb0jufl79QuLH6roPDNUitTAIEuEk8BZ8k3HeF1XrGCxPw2iZn+lSYiu54LotuBwnfCDIc+4NwRAEQqHinNmYei4sHmjS3aJcvLJa9FscJ4vzST8FgsDLz1d0XHOdfsrGMr6iSeSST1J3VUr2YY6jzZXdD39kxBQu3JEqChAIRCEAhCED2vTm1FClQWAZTHJtNynDQeFBVJSISqhEJ0JIQCIQhAIQgoBpU2iRI3UKex8KB0KfCugqNrghp6KVY7nJ8we7Q2tUcWNAiTJtsOyyvGuZl9UUg6WMv7neVm0MdpFvm9bLOxNUuJJMkkknqs8cdVpll0hc6UhCRKtmRISJZSIABLCRLCBYRCQIJQIhCEAkQlQAU1KooQlQIAnBASFAFIglIgVCAEEIBBKEIBCEIBOFRNSIJxW+ije6SmJU0FCEIQIkSpEAlJSIQOCTdCdT3QL8IoIWxha1JrHamFzoF+BPCyq8G4sOikohQlckVAhIlQEolCECIQlQCEiECoCRKgEiEqASJVLRpg7lBEhSPpgcqMoAIlIlQCRKkQCEIQCkao04FBqYOA1xcBEfiP5KjXI/Co5SFTQRxSIQqEUjQo1JTKBhCE4pqAQhKAgRCdCCEDUJxCagEiEqACcHpqRA4lIhCARCUICBIQlJSIEQhCBQlSJQgEkp+m090yECISlCBE9iaQnNQNQEIQCUIQgem/uhCBEhQhAiEIQKUiEIFQEIQAShCECIQhAiEIQKEqEIgH7pUIRTUoSoVA9NahCg//2Q==",
        texto: {
            pt: "Nicole Horne é uma das principais vilãs de Max Payne 1, presidente da farmacêutica Aesir Corporation, envolvida no desenvolvimento da droga Valkyr e responsável por grande parte do sofrimento de Max.",
            en: "Nicole Horne is one of the main villains in Max Payne 1, president of the pharmaceutical company Aesir Corporation, involved in the development of the Valkyr drug and responsible for much of Max's suffering.",
            es: "Nicole Horne es una de las principales villanas de Max Payne 1, presidenta de la farmacéutica Aesir Corporation, involucrada en el desarrollo de la droga Valkyr y responsable de gran parte del sufrimiento de Max."
        }
    }
];

let personagemAtual = 0;

function atualizarCarrosselPersonagem(lang = 'pt') {
    const p = personagens[personagemAtual];
    document.getElementById('personagemImg').src = p.img;
    document.getElementById('personagemNome').textContent = p.nome[lang];
    document.getElementById('personagemTexto').textContent = p.texto[lang];
    document.getElementById('personagemNome').setAttribute('data-pt', p.nome.pt);
    document.getElementById('personagemNome').setAttribute('data-en', p.nome.en);
    document.getElementById('personagemNome').setAttribute('data-es', p.nome.es);
    document.getElementById('personagemTexto').setAttribute('data-pt', p.texto.pt);
    document.getElementById('personagemTexto').setAttribute('data-en', p.texto.en);
    document.getElementById('personagemTexto').setAttribute('data-es', p.texto.es);
}

// carrossel 2
const personagens2 = [
    {
        nome: {
            pt: "Valerie Watson",
            en: "Valerie Watson",
            es: "Valerie Watson"
        },
        img: "https://www.giantbomb.com/a/uploads/scale_medium/1/11046/367359-winterson1.jpg",
        texto: {
            pt: "Valerie Watson é uma personagem crucial em Max Payne 2: The Fall of Max Payne, e embora sua presença no jogo seja relativamente discreta, ela tem um papel importante na trama e no desenvolvimento do personagem principal, Max Payne.",
            en: "Valerie Watson is a crucial character in Max Payne 2: The Fall of Max Payne. Although her presence in the game is relatively discreet, she plays an important role in the plot and in the development of the main character, Max Payne.",
            es: "Valerie Watson es un personaje crucial en Max Payne 2: The Fall of Max Payne. Aunque su presencia en el juego es relativamente discreta, tiene un papel importante en la trama y en el desarrollo del personaje principal, Max Payne."
        }
    },
    {
        nome: {
            pt: "Vinnie Gognitti",
            en: "Vinnie Gognitti",
            es: "Vinnie Gognitti"
        },
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpkWS_KeayjJmalSV01_7ZViW062fUlBqbRQ&s",
        texto: {
            pt: "Vinnie Gognitti é um dos antagonistas principais em Max Payne 2: The Fall of Max Payne e tem um papel crucial na trama do jogo. Ele é um mafioso de baixo escalão ligado à máfia russa em Nova Iorque, e sua presença ao longo da história de Max Payne 2 contribui significativamente para o enredo cheio de traições, violência e corrupção.",
            en: "Vinnie Gognitti is one of the main antagonists in Max Payne 2: The Fall of Max Payne and plays a crucial role in the game's plot. He is a low-level mobster connected to the Russian mafia in New York, and his presence throughout Max Payne 2's story contributes significantly to the plot full of betrayals, violence, and corruption.",
            es: "Vinnie Gognitti es uno de los principales antagonistas en Max Payne 2: The Fall of Max Payne y tiene un papel crucial en la trama del juego. Es un mafioso de bajo nivel vinculado a la mafia rusa en Nueva York, y su presencia a lo largo de la historia de Max Payne 2 contribuye significativamente a la trama llena de traiciones, violencia y corrupción."
        }
    },
    {
        nome: {
            pt: "Jim Bravura",
            en: "Jim Bravura",
            es: "Jim Bravura"
        },
        img: "data:image/jpeg;base64,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",
        texto: {
            pt: "Jim Bravura é um personagem importante em Max Payne 2: The Fall of Max Payne, atuando como um dos policiais da força policial de Nova Iorque. Ele é o parceiro de Max Payne durante parte do jogo, embora sua relação com Max seja um tanto ambígua, dado o contexto em que os dois se encontram.",
            en: "Jim Bravura is an important character in Max Payne 2: The Fall of Max Payne, acting as one of the police officers in the New York police force. He is Max Payne's partner during part of the game, although his relationship with Max is somewhat ambiguous given the context in which they find themselves.",
            es: "Jim Bravura es un personaje importante en Max Payne 2: The Fall of Max Payne, actuando como uno de los policías de la fuerza policial de Nueva York. Es el compañero de Max Payne durante parte del juego, aunque su relación con Max es algo ambigua, dado el contexto en el que se encuentran."
        }
    }
];

let personagemAtual2 = 0;

function atualizarCarrosselPersonagem2(lang = 'pt') {
    const p = personagens2[personagemAtual2];
    document.getElementById('personagemImg2').src = p.img;
    document.getElementById('personagemNome2').textContent = p.nome[lang];
    document.getElementById('personagemTexto2').textContent = p.texto[lang];
    document.getElementById('personagemNome2').setAttribute('data-pt', p.nome.pt);
    document.getElementById('personagemNome2').setAttribute('data-en', p.nome.en);
    document.getElementById('personagemNome2').setAttribute('data-es', p.nome.es);
    document.getElementById('personagemTexto2').setAttribute('data-pt', p.texto.pt);
    document.getElementById('personagemTexto2').setAttribute('data-en', p.texto.en);
    document.getElementById('personagemTexto2').setAttribute('data-es', p.texto.es);
}


function setLanguage(lang) {
    if (typeof localStorage !== 'undefined') {
        localStorage.setItem('lang', lang);
    }

    document.querySelectorAll('.lang').forEach(function (el) {
        if (el.dataset[lang]) {
            el.textContent = el.dataset[lang];
        }
    });

    if (typeof atualizarCarrosselPersonagem === 'function' && document.getElementById('personagemImg')) {
        atualizarCarrosselPersonagem(lang);
    }

    if (typeof atualizarCarrosselPersonagem2 === 'function' && document.getElementById('personagemImg2')) {
        atualizarCarrosselPersonagem2(lang);
    }
}

// carrossel max payne 3
const personagens3 = [
    {
        nome: {
            pt: "Raul Passos",
            en: "Raul Passos",
            es: "Raul Passos"
        },
        img: "data:image/jpeg;base64,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",
        texto: {
            pt: "Raul Passos é um dos personagens centrais de Max Payne 3, servindo como amigo e antigo colega de Max. Ex-policial da NYPD, ele convence Max a deixar Nova York e aceitar um emprego como segurança particular para a família Branco em São Paulo, Brasil. Apesar de ter boas intenções, Raul esconde segredos que acabam colocando ambos em uma situação perigosa. Durante a história, sua lealdade é testada, e ele se revela um personagem complexo, tentando sobreviver em meio à corrupção e ao caos.",
            en: "Raul Passos is one of the central characters in Max Payne 3, serving as Max's friend and former colleague. A former NYPD officer, he convinces Max to leave New York and take a job as a private security guard for the Branco family in São Paulo, Brazil. Despite good intentions, Raul hides secrets that put both in danger. Throughout the story, his loyalty is tested, and he proves to be a complex character trying to survive amid corruption and chaos.",
            es: "Raul Passos es uno de los personajes centrales de Max Payne 3, sirviendo como amigo y antiguo colega de Max. Ex-policía de la NYPD, convence a Max de dejar Nueva York y aceptar un trabajo como guardaespaldas privado para la familia Branco en São Paulo, Brasil. Aunque tiene buenas intenciones, Raul esconde secretos que terminan poniendo a ambos en peligro. Durante la historia, su lealtad es puesta a prueba y se revela como un personaje complejo, intentando sobrevivir en medio de la corrupción y el caos."
        }
    },
    {
        nome: {
            pt: "Victor Branco",
            en: "Victor Branco",
            es: "Victor Branco"
        },
        img: "data:image/jpeg;base64,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",
        texto: {
            pt: "Victor Branco é um dos principais antagonistas de Max Payne 3. Ele é o irmão do meio da influente família Branco e um político ambicioso de São Paulo. Diferente de seus irmãos—Rodrigo, o empresário, e Marcelo, o playboy despreocupado—Victor finge ser um homem respeitável, mas na verdade está profundamente envolvido em esquemas corruptos e criminosos. Ao longo da história, revela-se que ele manipulou eventos para seus próprios interesses, incluindo o sequestro de sua cunhada Fabiana. Frio e calculista, Victor representa a face política e impiedosa da corrupção no jogo.",
            en: "Victor Branco is one of the main antagonists in Max Payne 3. He is the middle brother of the influential Branco family and an ambitious politician from São Paulo. Unlike his brothers—Rodrigo, the businessman, and Marcelo, the carefree playboy—Victor pretends to be a respectable man but is deeply involved in corrupt and criminal schemes. Throughout the story, it is revealed that he manipulated events for his own interests, including the kidnapping of his sister-in-law Fabiana. Cold and calculating, Victor represents the political and ruthless face of corruption in the game.",
            es: "Victor Branco es uno de los principales antagonistas de Max Payne 3. Es el hermano del medio de la influyente familia Branco y un político ambicioso de São Paulo. A diferencia de sus hermanos—Rodrigo, el empresario, y Marcelo, el playboy despreocupado—Victor finge ser un hombre respetable, pero en realidad está profundamente involucrado en esquemas corruptos y criminales. A lo largo de la historia, se revela que manipuló eventos para sus propios intereses, incluido el secuestro de su cuñada Fabiana. Frío y calculador, Victor representa la cara política e implacable de la corrupción en el juego."
        }
    },
    {
        nome: {
            pt: "Serrano",
            en: "Serrano",
            es: "Serrano"
        },
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRY20Uw6DwMBg1tWvHIPjL00mAlRTIm1rmKzA&s",
        texto: {
            pt: "Serrano é um dos líderes do Comando Sombra, uma violenta facção criminosa em Max Payne 3. Ele aparece como um antagonista em várias partes do jogo, sendo responsável pelo sequestro de Fabiana Branco. Diferente dos vilões mais calculistas, como Victor Branco, Serrano age de forma brutal e impulsiva, representando o lado mais caótico e cruel do crime organizado. No entanto, ao longo da história, ele também demonstra ser uma vítima do sistema corrupto em que vive. Em um momento marcante, ele se volta contra seus aliados após ser traído, mostrando que mesmo dentro do mundo do crime, não há lealdade verdadeira.",
            en: "Serrano is one of the leaders of Comando Sombra, a violent criminal faction in Max Payne 3. He appears as an antagonist in several parts of the game, being responsible for the kidnapping of Fabiana Branco. Unlike more calculating villains like Victor Branco, Serrano acts brutally and impulsively, representing the most chaotic and cruel side of organized crime. However, throughout the story, he also proves to be a victim of the corrupt system he lives in. In a striking moment, he turns against his allies after being betrayed, showing that even within the world of crime, there is no true loyalty.",
            es: "Serrano es uno de los líderes del Comando Sombra, una violenta facción criminal en Max Payne 3. Aparece como antagonista en varias partes del juego, siendo responsable del secuestro de Fabiana Branco. A diferencia de los villanos más calculadores, como Victor Branco, Serrano actúa de forma brutal e impulsiva, representando el lado más caótico y cruel del crimen organizado. Sin embargo, a lo largo de la historia, también demuestra ser una víctima del sistema corrupto en el que vive. En un momento clave, se vuelve contra sus aliados tras ser traicionado, mostrando que incluso dentro del mundo del crimen, no hay lealtad verdadera."
        }
    }
];

let personagemAtual3 = 0;

function atualizarCarrosselPersonagem3(lang = 'pt') {
    const p = personagens3[personagemAtual3];
    document.getElementById('personagemImg3').src = p.img;
    document.getElementById('personagemNome3').textContent = p.nome[lang];
    document.getElementById('personagemTexto3').textContent = p.texto[lang];
    document.getElementById('personagemNome3').setAttribute('data-pt', p.nome.pt);
    document.getElementById('personagemNome3').setAttribute('data-en', p.nome.en);
    document.getElementById('personagemNome3').setAttribute('data-es', p.nome.es);
    document.getElementById('personagemTexto3').setAttribute('data-pt', p.texto.pt);
    document.getElementById('personagemTexto3').setAttribute('data-en', p.texto.en);
    document.getElementById('personagemTexto3').setAttribute('data-es', p.texto.es);
}

window.addEventListener('DOMContentLoaded', function () {
    let lang = 'pt';
    if (typeof localStorage !== 'undefined' && localStorage.getItem('lang')) {
        lang = localStorage.getItem('lang');
    }
    if (document.getElementById('personagemImg3')) {
        atualizarCarrosselPersonagem3(lang);
        document.getElementById('prevPersonagem3').onclick = function () {
            personagemAtual3 = (personagemAtual3 - 1 + personagens3.length) % personagens3.length;
            atualizarCarrosselPersonagem3(lang);
        };
        document.getElementById('nextPersonagem3').onclick = function () {
            personagemAtual3 = (personagemAtual3 + 1) % personagens3.length;
            atualizarCarrosselPersonagem3(lang);
        };
    }
});

if (typeof atualizarCarrosselPersonagem3 === 'function' && document.getElementById('personagemImg3')) {
    atualizarCarrosselPersonagem3(lang);
}