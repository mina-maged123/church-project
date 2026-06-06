export const levels = [
  {
    id: '1',
    name: 'حضانة لـ ٢ ابتدائي',
    subLevel: 'مستوى أول',
    title: 'حضانة لـ ٢ ابتدائي',
    subtitle: 'مستوى أول',
    description: 'مجموعة دروس تمهيدية في الألحان واللغة والطقس للمراحل الابتدائية.',
    sections: [
      {
        id: 'chants',
        name: 'ألحان',
        title: 'ألحان',
        color: 'gold',
        accent: 'var(--gold)',
        description: 'دروس الترتيل والنغمة القبطية وضبط المقامات الكنسية.',
        lessons: [
          {
            id: '1',
            title: 'ذوكصاباتري',
            titleCoptic: 'Doxa Patri',
            description: 'يقال في رفع الحمل قبل صلاة الشكر',
            melodyWritten: true,
            melodyText: `ذوكصاباتري
يقال في رفع الحمل قبل صلاة الشكر

المجد للآب والابن والروح القدس
ذوكصاباتري كيه ايو كيه اجيو بنفماتي
الآن وكل أوان وإلى دهر الدهور آمين — الليلويا
كيه نين كيه | اي كيه استوس ايه اوناس تون ايه اونون آمين
✠ Doxa patri ke ... ke asiw ... pnevmati`,
            videoUrl: 'https://youtu.be/ReAeU9aX6WA?si=AuNbxpUcDkgWUtir',
            melodyImage: '/images/doxa-patri.png',
            duration: '10 دقيقة',
            difficulty: 'مستوى مبتدئ',
          },
          {
            id: '2',
            title: 'إك إسمارؤوت',
            titleCoptic: "K`cmarwovt",
            description: 'مرد الابركسيس المختصر — مبارك أنت بالحقيقة',
            duration: '12 دقيقة',
            difficulty: 'مستوى مبتدئ',
          },
          {
            id: '3',
            title: 'اللليلويا فاي بي بي',
            titleCoptic: 'Allilouia fai pi pi',
            description: 'يقال في جميع الأعياد السيدية وأيام الافطار وسبوت',
            duration: '14 دقيقة',
            difficulty: 'مستوى متوسط',
          },
          {
            id: '4',
            title: 'مرد الانجيل السنوي',
            titleCoptic: 'Marenovw2t',
            description: 'يقال بعد قراءة الانجيل والموعظة والطرح',
            duration: '14 دقيقة',
            difficulty: 'مستوى متوسط',
          },
          {
            id: '5',
            title: 'مرد انجيل عيد الميلاد',
            titleCoptic: 'Ovciov aqyai',
            description: 'مرد انجيل عيد الميلاد المجيد',
            duration: '16 دقيقة',
            difficulty: 'مستوى متوسط',
          },
          {
            id: '6',
            title: 'تين أووأوشت',
            titleCoptic: 'Tenov w2t',
            description: 'لحن البركة — نسجد للآب والابن والروح القدس',
            duration: '18 دقيقة',
            difficulty: 'مستوى متقدم',
          },
          {
            id: '7',
            title: 'هيتين ابريسفيا',
            titleCoptic: "Hiten ni`precbia",
            description: 'يقال بعد القبلة المقدسة — بشفاعات والدة الإله',
            duration: '18 دقيقة',
            difficulty: 'مستوى متقدم',
          },
        ],
      },
      {
        id: 'coptic',
        name: 'قبطي',
        title: 'قبطي',
        color: 'cobalt',
        accent: 'var(--cobalt)',
        description: 'اللغة القبطية، الحروف، والقراءة الصحيحة للنصوص.',
        lessons: [
          { id: '1', title: 'الحروف القبطية — ألفا إلى تاف', duration: '15 دقيقة', difficulty: 'مستوى مبتدئ' },
          { id: '2', title: 'الأرقام القبطية من ١ إلى ١٠', duration: '12 دقيقة', difficulty: 'مستوى مبتدئ' },
          { id: '3', title: 'رشم الصليب قبطي', duration: '10 دقيقة', difficulty: 'مستوى مبتدئ' },
        ],
      },
      {
        id: 'liturgical',
        name: 'طقسي',
        title: 'طقسي',
        color: 'deep-red',
        accent: 'var(--deep-red)',
        description: 'ترتيب الصلوات والذوق الطقسي داخل الكنيسة القبطية.',
        lessons: [
          { id: '1', title: 'تطور الكنيسة من العهد القديم للعهد الجديد', duration: '20 دقيقة', difficulty: 'مستوى مبتدئ' },
          { id: '2', title: 'الشكل الخارجي للمبنى الكنسي', duration: '15 دقيقة', difficulty: 'مستوى مبتدئ' },
          { id: '3', title: 'أقسام الكنيسة', duration: '18 دقيقة', difficulty: 'مستوى متوسط' },
          { id: '4', title: 'أواني وأدوات المذبح', duration: '20 دقيقة', difficulty: 'مستوى متوسط' },
          { id: '5', title: 'حامل الأيقونات', duration: '15 دقيقة', difficulty: 'مستوى متوسط' },
          { id: '6', title: 'ملحقات المبنى الكنسي', duration: '15 دقيقة', difficulty: 'مستوى متوسط' },
        ],
      },
    ],
  },
  // Levels 2–6 placeholders (lessons to be added later)
  { id: '2', name: 'حضانة لـ ٢ ابتدائي', subLevel: 'مستوى تاني', title: 'حضانة لـ ٢ ابتدائي', subtitle: 'مستوى تاني', description: 'المستوى الثاني للمراحل التمهيدية.', sections: [
    { id: 'chants', name: 'ألحان', title: 'ألحان', color: 'gold', accent: 'var(--gold)', description: '', lessons: [] },
    { id: 'coptic', name: 'قبطي', title: 'قبطي', color: 'cobalt', accent: 'var(--cobalt)', description: '', lessons: [] },
    { id: 'liturgical', name: 'طقسي', title: 'طقسي', color: 'deep-red', accent: 'var(--deep-red)', description: '', lessons: [] },
  ] },
  { id: '3', name: '٣ لـ ٦ ابتدائي', subLevel: 'مستوى أول', title: '٣ لـ ٦ ابتدائي', subtitle: 'مستوى أول', description: '', sections: [
    { id: 'chants', name: 'ألحان', title: 'ألحان', color: 'gold', accent: 'var(--gold)', description: '', lessons: [] },
    { id: 'coptic', name: 'قبطي', title: 'قبطي', color: 'cobalt', accent: 'var(--cobalt)', description: '', lessons: [] },
    { id: 'liturgical', name: 'طقسي', title: 'طقسي', color: 'deep-red', accent: 'var(--deep-red)', description: '', lessons: [] },
  ] },
  { id: '4', name: '٣ لـ ٦ ابتدائي', subLevel: 'مستوى تاني', title: '٣ لـ ٦ ابتدائي', subtitle: 'مستوى تاني', description: '', sections: [
    { id: 'chants', name: 'ألحان', title: 'ألحان', color: 'gold', accent: 'var(--gold)', description: '', lessons: [] },
    { id: 'coptic', name: 'قبطي', title: 'قبطي', color: 'cobalt', accent: 'var(--cobalt)', description: '', lessons: [] },
    { id: 'liturgical', name: 'طقسي', title: 'طقسي', color: 'deep-red', accent: 'var(--deep-red)', description: '', lessons: [] },
  ] },
  { id: '5', name: 'إعدادي وثانوي', subLevel: '—', title: 'إعدادي وثانوي', subtitle: '—', description: '', sections: [
    { id: 'chants', name: 'ألحان', title: 'ألحان', color: 'gold', accent: 'var(--gold)', description: '', lessons: [] },
    { id: 'coptic', name: 'قبطي', title: 'قبطي', color: 'cobalt', accent: 'var(--cobalt)', description: '', lessons: [] },
    { id: 'liturgical', name: 'طقسي', title: 'طقسي', color: 'deep-red', accent: 'var(--deep-red)', description: '', lessons: [] },
  ] },
  { id: '6', name: 'جامعة وخريجين', subLevel: '—', title: 'جامعة وخريجين', subtitle: '—', description: '', sections: [
    { id: 'chants', name: 'ألحان', title: 'ألحان', color: 'gold', accent: 'var(--gold)', description: '', lessons: [] },
    { id: 'coptic', name: 'قبطي', title: 'قبطي', color: 'cobalt', accent: 'var(--cobalt)', description: '', lessons: [] },
    { id: 'liturgical', name: 'طقسي', title: 'طقسي', color: 'deep-red', accent: 'var(--deep-red)', description: '', lessons: [] },
    { id: 'readings', name: 'قراءات', title: 'قراءات', color: 'muted-green', accent: 'var(--muted-green)', description: '', lessons: [] },
  ] },
];

export const verses = [
  { coptic: 'ⲡⲁⲥⲱⲧⲏⲣ ⲛⲁⲓ ⲉⲣⲟⲓ', arabic: 'يا مخلص ارحمني' },
  { coptic: 'ϯⲛⲁⲓ ⲛⲁⲕ ⲡϫⲟⲉⲓⲥ', arabic: 'أسبحك يا رب' },
  { coptic: 'ⲡϫⲟⲉⲓⲥ ⲛⲁⲓ ⲉⲣⲟⲓ', arabic: 'الرب ارحم' },
];

export function getLevelById(levelId) {
  return levels.find((level) => String(level.id) === String(levelId));
}

export function getSectionById(level, sectionId) {
  return level?.sections.find((section) => section.id === sectionId);
}

export function getLessonById(level, sectionId, lessonId) {
  const section = getSectionById(level, sectionId);
  return section?.lessons.find((lesson) => String(lesson.id) === String(lessonId));
}

export function getRecentLessonChips() {
  return levels
    .flatMap((level) => level.sections.flatMap((section) => section.lessons.slice(0, 1).map((lesson) => ({
      label: lesson.title,
      path: `/level/${level.id}/section/${section.id}/lesson/${lesson.id}`,
    }))))
    .slice(0, 6);
}
