/**
 * ============================================
 * CROSSWORD GAME ENGINE
 * 50 уровней, современный UX
 * ============================================
 */

(function() {
    'use strict';

    const S = {
        level: 1,
        totalLevels: 50,
        score: 0,
        streak: 0,
        bestStreak: 0,
        hintsLeft: 3,
        hintsUsedThisLevel: 0,
        completed: false,
        gameOver: false
    };

    const LEVELS = [
        { q: 'Столица Франции?', a: 'ПАРИЖ', h: 'Город Эйфелевой башни' },
        { q: 'Самая большая планета?', a: 'ЮПИТЕР', h: 'Газовый гигант' },
        { q: 'Птица — символ мудрости?', a: 'СОВА', h: 'Ночной хищник' },
        { q: 'Фрукт Ньютона?', a: 'ЯБЛОКО', h: 'Упало на голову учёному' },
        { q: 'Столица России?', a: 'МОСКВА', h: 'Красная площадь' },
        { q: 'Высочайшая гора?', a: 'ЭВЕРЕСТ', h: 'В Гималаях' },
        { q: 'Быстрый транспорт?', a: 'САМОЛЁТ', h: 'Летает в облаках' },
        { q: 'Ловит мышей?', a: 'КОШКА', h: 'Мурлычет' },
        { q: 'Холодный океан?', a: 'СЕВЕРНЫЙ', h: 'На севере планеты' },
        { q: 'Рисовальный инструмент?', a: 'КАРАНДАШ', h: 'Грифель внутри' },
        { q: 'Время после лета?', a: 'ОСЕНЬ', h: 'Листья желтеют' },
        { q: 'Столица Японии?', a: 'ТОКИО', h: 'Город сакуры' },
        { q: 'Длиннейшая река?', a: 'АМАЗОНКА', h: 'В Южной Америке' },
        { q: 'Меряет температуру?', a: 'ГРАДУСНИК', h: 'Ртутный прибор' },
        { q: 'Планета с кольцами?', a: 'САТУРН', h: 'Шестая от Солнца' },
        { q: 'Несёт яйца?', a: 'КУРИЦА', h: 'Домашняя птица' },
        { q: 'Орган зрения?', a: 'ГЛАЗ', h: 'Их два у человека' },
        { q: 'Крупнейший материк?', a: 'ЕВРАЗИЯ', h: 'Европа + Азия' },
        { q: 'Фруктовый напиток?', a: 'КОМПОТ', h: 'Варят из ягод' },
        { q: 'Игра с корзиной?', a: 'БАСКЕТБОЛ', h: 'Мяч в кольцо' },
        { q: 'Цвет неба?', a: 'ГОЛУБОЙ', h: 'Как море в штиль' },
        { q: 'Столица Британии?', a: 'ЛОНДОН', h: 'Биг-Бен' },
        { q: 'Мебель для сна?', a: 'КРОВАТЬ', h: 'На ней спят' },
        { q: 'Перед рассветом?', a: 'УТРО', h: 'Восход солнца' },
        { q: 'Малый океан?', a: 'АРКТИКА', h: 'Крайний север' },
        { q: 'Показывает время?', a: 'ЧАСЫ', h: 'Наручные или настенные' },
        { q: 'Первый месяц?', a: 'ЯНВАРЬ', h: 'Новый год' },
        { q: 'Красная планета?', a: 'МАРС', h: 'Четвёртая от Солнца' },
        { q: 'Длинная шея?', a: 'ЖИРАФ', h: 'Самое высокое животное' },
        { q: 'Столица Германии?', a: 'БЕРЛИН', h: 'Бранденбургские ворота' },
        { q: 'Наука о числах?', a: 'АЛГЕБРА', h: 'Раздел математики' },
        { q: 'Цвет травы?', a: 'ЗЕЛЁНЫЙ', h: 'Летний луг' },
        { q: 'Друг человека?', a: 'СОБАКА', h: 'Виляет хвостом' },
        { q: 'Клавишный инструмент?', a: 'ПИАНИНО', h: 'Чёрно-белые клавиши' },
        { q: 'Главный город?', a: 'СТОЛИЦА', h: 'Там правительство' },
        { q: 'Хищник океана?', a: 'АКУЛА', h: 'Острые зубы' },
        { q: 'Пишут мелом?', a: 'ДОСКА', h: 'В классе на стене' },
        { q: 'Яркая звезда?', a: 'СОЛНЦЕ', h: 'Даёт свет и тепло' },
        { q: 'Выходной день?', a: 'СУББОТА', h: 'Конец недели' },
        { q: 'Даёт мёд?', a: 'ПЧЕЛА', h: 'Живёт в улье' },
        { q: 'Зимние осадки?', a: 'СНЕГ', h: 'Белый и холодный' },
        { q: 'Подземный транспорт?', a: 'МЕТРО', h: 'Ездит под городом' },
        { q: 'Цветок с шипами?', a: 'РОЗА', h: 'Символ любви' },
        { q: 'Жаркий материк?', a: 'АФРИКА', h: 'Львы и слоны' },
        { q: 'Для звонков?', a: 'ТЕЛЕФОН', h: 'Мобильный аппарат' },
        { q: 'Освещает комнату?', a: 'ЛАМПА', h: 'Настольный свет' },
        { q: 'Детёныш собаки?', a: 'ЩЕНОК', h: 'Маленький и пушистый' },
        { q: 'Столица Италии?', a: 'РИМ', h: 'Вечный город' },
        { q: 'Юноша?', a: 'ПАРЕНЬ', h: 'Молодой человек' },
        { q: 'Заморозка воды?', a: 'ЛЁД', h: 'Твёрдое состояние' }
    ];

    const $ = (selector) => document.querySelector(selector);

    const dom = {
        levelBadge: $('#levelBadge'),
        scoreDisplay: $('#scoreDisplay'),
        streakBadge: $('#streakBadge'),
        streakDisplay: $('#streakDisplay'),
        progressBar: $('#progressBar'),
        questionText: $('#questionText'),
        hintBlock: $('#hintBlock'),
        hintText: $('#hintText'),
        gridWrapper: $('#gridWrapper'),
        hintBtn: $('#hintBtn'),
        hintCount: $('#hintCount'),
        checkBtn: $('#checkBtn'),
        resetBtn: $('#resetBtn'),
        levelModal: $('#levelModal'),
        modalStars: $('#modalStars'),
        modalAnswer: $('#modalAnswer'),
        modalScore: $('#modalScore'),
        modalStreak: $('#modalStreak'),
        modalHints: $('#modalHints'),
        nextLevelBtn: $('#nextLevelBtn'),
        gameCompleteModal: $('#gameCompleteModal'),
        finalScore: $('#finalScore'),
        achievements: $('#achievements'),
        restartBtn: $('#restartBtn'),
        toast: $('#toast'),
        toastIcon: $('#toastIcon'),
        toastMessage: $('#toastMessage'),
        confetti: $('#confetti'),
        particles: $('#particles')
    };

    let currentLevel = null;
    let currentInputs = [];
    let currentInputIndex = 0;
    let toastTimer;

    function createParticles() {
        const container = dom.particles;
        for (let i = 0; i < 28; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDuration = (Math.random() * 8 + 6) + 's';
            particle.style.animationDelay = Math.random() * 10 + 's';
            particle.style.width = (Math.random() * 3 + 1) + 'px';
            particle.style.height = particle.style.width;
            container.appendChild(particle);
        }
    }

    function showToast(message, type = 'info') {
        clearTimeout(toastTimer);
        dom.toast.className = 'toast ' + type;
        dom.toastMessage.textContent = message;
        dom.toastIcon.textContent = type === 'success' ? '✓' : type === 'error' ? '!' : 'i';
        dom.toast.classList.add('show');
        toastTimer = setTimeout(() => dom.toast.classList.remove('show'), 2200);
    }

    function updateHUD() {
        dom.levelBadge.textContent = `${S.level} / ${S.totalLevels}`;
        dom.scoreDisplay.textContent = S.score;
        dom.streakDisplay.textContent = `x${S.streak || 1}`;
        dom.streakBadge.style.display = S.streak > 0 ? 'flex' : 'none';
        dom.progressBar.style.width = `${(S.level / S.totalLevels) * 100}%`;
        dom.hintCount.textContent = S.hintsLeft;
    }

    function buildGrid() {
        dom.gridWrapper.innerHTML = '';
        const row = document.createElement('div');
        row.className = 'grid-row';

        currentLevel.a.split('').forEach((letter, index) => {
            const input = document.createElement('input');
            input.className = 'cell-input';
            input.maxLength = 1;
            input.setAttribute('inputmode', 'text');
            input.setAttribute('autocomplete', 'off');
            input.setAttribute('data-index', index);
            input.addEventListener('input', handleCellInput);
            input.addEventListener('keydown', handleCellKeydown);
            input.addEventListener('focus', () => {
                currentInputIndex = Number(input.dataset.index);
            });
            row.appendChild(input);
        });

        dom.gridWrapper.appendChild(row);
        currentInputs = Array.from(dom.gridWrapper.querySelectorAll('.cell-input'));
        currentInputIndex = 0;
        currentInputs[0]?.focus();
    }

    function handleCellInput(event) {
        const input = event.target;
        const value = input.value.toUpperCase().replace(/[^А-ЯЁ]/g, '').slice(-1);
        input.value = value;

        if (value) {
            const nextIndex = Number(input.dataset.index) + 1;
            if (currentInputs[nextIndex]) {
                currentInputs[nextIndex].focus();
            }
        }
    }

    function handleCellKeydown(event) {
        const input = event.target;
        const index = Number(input.dataset.index);

        if (event.key === 'Backspace' && !input.value) {
            event.preventDefault();
            const previous = currentInputs[index - 1];
            if (previous) {
                previous.focus();
                previous.value = '';
                previous.classList.remove('wrong', 'correct', 'hint-reveal');
            }
            return;
        }

        if (event.key === 'ArrowRight' && currentInputs[index + 1]) {
            event.preventDefault();
            currentInputs[index + 1].focus();
        }

        if (event.key === 'ArrowLeft' && currentInputs[index - 1]) {
            event.preventDefault();
            currentInputs[index - 1].focus();
        }

        if (event.key === 'Enter') {
            event.preventDefault();
            checkAnswer();
        }
    }

    function resetInputs() {
        currentInputs.forEach((input) => {
            input.value = '';
            input.classList.remove('correct', 'wrong', 'hint-reveal');
            input.disabled = false;
        });
        currentInputs[0]?.focus();
    }

    function loadLevel() {
        S.hintsLeft = 3;
        S.hintsUsedThisLevel = 0;
        currentLevel = LEVELS[S.level - 1];
        dom.questionText.textContent = currentLevel.q;
        dom.hintText.textContent = 'Нажмите «Подсказка», если нужно';
        dom.hintBlock.classList.remove('revealed');
        buildGrid();
        updateHUD();
        resetInputs();
        showToast(`Уровень ${S.level} готов`, 'info');
    }

    function isSolved() {
        return currentInputs.every((input, index) => input.value.toUpperCase() === currentLevel.a[index]);
    }

    function checkAnswer() {
        let correct = 0;
        currentInputs.forEach((input, index) => {
            const expected = currentLevel.a[index];
            const value = input.value.toUpperCase();
            input.classList.remove('wrong', 'correct', 'hint-reveal');
            if (value === expected) {
                input.classList.add('correct');
                correct += 1;
            } else {
                input.classList.add('wrong');
            }
        });

        if (correct === currentLevel.a.length) {
            const scoreGain = 100 + Math.max(0, 25 - S.hintsUsedThisLevel * 10) + Math.min(40, S.streak * 5);
            S.score += scoreGain;
            S.streak += 1;
            S.bestStreak = Math.max(S.bestStreak, S.streak);
            updateHUD();
            showToast('Уровень пройден!', 'success');
            createConfetti();
            setTimeout(() => showLevelModal(scoreGain), 700);
            return;
        }

        S.streak = 0;
        updateHUD();
        showToast('Есть ошибки — попробуйте ещё раз', 'error');
    }

    function revealHint() {
        if (S.hintsLeft <= 0) {
            showToast('Подсказки закончились', 'error');
            return;
        }

        const emptyIndex = currentInputs.findIndex((input) => input.value.trim() === '');
        const indexToReveal = emptyIndex >= 0 ? emptyIndex : 0;
        const letter = currentLevel.a[indexToReveal];
        currentInputs[indexToReveal].value = letter;
        currentInputs[indexToReveal].classList.add('hint-reveal');
        currentInputs[indexToReveal].classList.remove('wrong');
        S.hintsLeft -= 1;
        S.hintsUsedThisLevel += 1;
        dom.hintText.textContent = `Подсказка: ${currentLevel.h}`;
        dom.hintBlock.classList.add('revealed');
        updateHUD();
        showToast('Открыта буква', 'info');

        if (isSolved()) {
            setTimeout(() => showLevelModal(0), 400);
        }
    }

    function showLevelModal(scoreGain) {
        dom.modalStars.querySelectorAll('.star').forEach((star) => star.classList.remove('active'));
        const stars = S.hintsUsedThisLevel === 0 ? 3 : S.hintsUsedThisLevel === 1 ? 2 : 1;
        for (let i = 0; i < stars; i += 1) {
            dom.modalStars.children[i]?.classList.add('active');
        }
        dom.modalAnswer.textContent = `Ответ: ${currentLevel.a}`;
        dom.modalScore.textContent = scoreGain > 0 ? `+${scoreGain}` : '+0';
        dom.modalStreak.textContent = `x${S.streak}`;
        dom.modalHints.textContent = S.hintsUsedThisLevel;
        dom.levelModal.classList.add('show');
    }

    function hideLevelModal() {
        dom.levelModal.classList.remove('show');
    }

    function showGameComplete() {
        S.gameOver = true;
        dom.finalScore.textContent = S.score;
        dom.achievements.innerHTML = '';
        const badges = [];
        if (S.score >= 5000) badges.push('🏆 Мастер слов');
        if (S.bestStreak >= 5) badges.push('🔥 Серия');
        if (S.hintsUsedThisLevel <= 5) badges.push('💡 Быстрый ум');
        badges.forEach((text) => {
            const tag = document.createElement('span');
            tag.className = 'achievement-tag';
            tag.textContent = text;
            dom.achievements.appendChild(tag);
        });
        dom.gameCompleteModal.classList.add('show');
    }

    function hideGameComplete() {
        dom.gameCompleteModal.classList.remove('show');
    }

    function startNextLevel() {
        hideLevelModal();
        if (S.level >= S.totalLevels) {
            showGameComplete();
            return;
        }
        S.level += 1;
        loadLevel();
    }

    function resetGame() {
        S.level = 1;
        S.score = 0;
        S.streak = 0;
        S.bestStreak = 0;
        S.hintsLeft = 3;
        S.hintsUsedThisLevel = 0;
        S.completed = false;
        S.gameOver = false;
        hideGameComplete();
        loadLevel();
    }

    function createConfetti() {
        for (let i = 0; i < 40; i += 1) {
            const piece = document.createElement('div');
            piece.className = 'confetti-piece';
            piece.style.left = Math.random() * 100 + '%';
            piece.style.top = '-20px';
            piece.style.background = ['#6c5ce7', '#00d68f', '#ffaa00', '#ff4757'][Math.floor(Math.random() * 4)];
            piece.style.animationDelay = Math.random() * 0.2 + 's';
            dom.confetti.appendChild(piece);
            setTimeout(() => piece.remove(), 2800);
        }
    }

    function bindEvents() {
        dom.hintBtn.addEventListener('click', revealHint);
        dom.checkBtn.addEventListener('click', checkAnswer);
        dom.resetBtn.addEventListener('click', () => {
            resetInputs();
            showToast('Поле очищено', 'info');
        });
        dom.nextLevelBtn.addEventListener('click', startNextLevel);
        dom.restartBtn.addEventListener('click', resetGame);
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                hideLevelModal();
                hideGameComplete();
            }
        });
    }

    function init() {
        createParticles();
        bindEvents();
        loadLevel();
    }

    init();
})();
