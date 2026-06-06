import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { levels } from '../data/levels';

const AuthContext = createContext(null);
const STORAGE_KEY = 'coptic-platform-session';
const USERS_STORAGE_KEY = 'coptic-platform-users';

const defaultCredentials = {
  email: 'example@church.com',
  password: 'password1',
};

const defaultProfile = {
  id: 'seed-user',
  email: defaultCredentials.email,
  name: 'مريم عزيز',
  avatar: null,
  level: '1',
  levelName: 'حضانة لـ ٢ ابتدائي',
  subLevel: 'مستوى أول',
  birthdate: {
    day: '15',
    month: '3',
    year: '2010',
  },
  isActive: true,
  lessonProgress: [
    { lessonId: 1, title: 'ذوكصاباتري', section: 'chants', progressPercent: 100 },
    { lessonId: 2, title: 'إك إسمارؤوت', section: 'chants', progressPercent: 100 },
    { lessonId: 3, title: 'الحروف القبطية', section: 'coptic', progressPercent: 60 },
    { lessonId: 4, title: 'أقسام الكنيسة', section: 'liturgical', progressPercent: 30 },
  ],
  quizResults: [
    { quizTitle: 'كويز المرحلة الأولى', date: '2026-05-28', score: 87 },
    { quizTitle: 'كويز الألحان', date: '2026-05-20', score: 65 },
    { quizTitle: 'كويز القبطي', date: '2026-05-12', score: 50 },
  ],
};

const seedAccount = {
  ...defaultProfile,
  password: defaultCredentials.password,
};

const levelLookup = new Map(levels.map((level) => [String(level.id), level]));

const safeParse = (value, fallback) => {
  try {
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
};

const normalizeBirthdate = (birthdate) => {
  if (!birthdate) return defaultProfile.birthdate;

  if (typeof birthdate === 'string') {
    const parts = birthdate.split('-');
    if (parts.length === 3) {
      const [year, month, day] = parts;
      return {
        day: String(Number(day) || day),
        month: String(Number(month) || month),
        year: String(Number(year) || year),
      };
    }
  }

  if (typeof birthdate === 'object') {
    return {
      day: String(birthdate.day ?? defaultProfile.birthdate.day),
      month: String(birthdate.month ?? defaultProfile.birthdate.month),
      year: String(birthdate.year ?? defaultProfile.birthdate.year),
    };
  }

  return defaultProfile.birthdate;
};

const getLevelMeta = (levelId) => {
  const level = levelLookup.get(String(levelId));
  return level ? { name: level.name, subLevel: level.subLevel } : {
    name: defaultProfile.levelName,
    subLevel: defaultProfile.subLevel,
  };
};

const normalizeProfile = (user) => {
  if (!user) return null;

  const levelId = String(user.level ?? defaultProfile.level);
  const levelMeta = getLevelMeta(levelId);

  return {
    ...defaultProfile,
    ...user,
    id: user.id ?? defaultProfile.id,
    email: user.email ?? defaultProfile.email,
    name: user.name ?? defaultProfile.name,
    level: levelId,
    levelName: user.levelName ?? levelMeta.name,
    subLevel: user.subLevel ?? levelMeta.subLevel,
    birthdate: normalizeBirthdate(user.birthdate),
    avatar: user.avatar ?? null,
    isActive: user.isActive ?? true,
    lessonProgress: Array.isArray(user.lessonProgress) ? user.lessonProgress : defaultProfile.lessonProgress,
    quizResults: Array.isArray(user.quizResults) ? user.quizResults : defaultProfile.quizResults,
  };
};

const normalizeStoredUser = (user) => ({
  ...normalizeProfile(user),
  password: typeof user?.password === 'string'
    ? user.password
    : (String(user?.email ?? '').toLowerCase() === defaultCredentials.email ? defaultCredentials.password : ''),
});

const loadUsers = () => {
  if (typeof window === 'undefined') return [seedAccount];

  const storedUsers = safeParse(window.localStorage.getItem(USERS_STORAGE_KEY), null);
  if (!Array.isArray(storedUsers) || storedUsers.length === 0) {
    return [seedAccount];
  }

  const normalizedUsers = storedUsers.map(normalizeStoredUser);
  const hasSeedAccount = normalizedUsers.some((user) => user.email.toLowerCase() === defaultCredentials.email);

  if (!hasSeedAccount) {
    normalizedUsers.unshift(seedAccount);
  }

  return normalizedUsers;
};

const loadSession = () => {
  if (typeof window === 'undefined') return null;

  return safeParse(window.localStorage.getItem(STORAGE_KEY), null);
};

export function AuthProvider({ children }) {
  const [hydrated, setHydrated] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [lastVisitedLesson, setLastVisitedLesson] = useState(null);
  const [recentLessons, setRecentLessons] = useState([]);
  const [users, setUsers] = useState(() => loadUsers());

  useEffect(() => {
    setUsers(loadUsers());

    const session = loadSession();
    if (session) {
      setIsLoggedIn(Boolean(session.isLoggedIn));
      setUser(normalizeProfile(session.user ?? (session.isLoggedIn ? defaultProfile : null)));
      setLastVisitedLesson(session.lastVisitedLesson ?? null);
      setRecentLessons(Array.isArray(session.recentLessons) ? session.recentLessons : []);
    }

    setHydrated(true);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined' || !hydrated) return;

    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ isLoggedIn, user, lastVisitedLesson, recentLessons }),
    );
  }, [hydrated, isLoggedIn, user, lastVisitedLesson, recentLessons]);

  useEffect(() => {
    if (typeof window === 'undefined' || !hydrated) return;

    window.localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  }, [hydrated, users]);

  const persistLogin = (profile) => {
    setIsLoggedIn(true);
    setUser(profile);
    setLastVisitedLesson(null);
    setRecentLessons([]);
  };

  const login = async (email, password) => {
    const normalizedEmail = String(email ?? '').trim().toLowerCase();
    const matchedUser = users.find((candidate) => candidate.email.toLowerCase() === normalizedEmail && candidate.password === password);

    if (!matchedUser) {
      return { ok: false, message: 'البريد أو كلمة المرور غلط' };
    }

    const profile = normalizeProfile(matchedUser);
    persistLogin(profile);
    return { ok: true, user: profile };
  };

  const register = async (userData) => {
    const normalizedEmail = String(userData?.email ?? '').trim().toLowerCase();
    const normalizedPassword = String(userData?.password ?? '');
    const trimmedName = String(userData?.name ?? '').trim();
    const levelId = String(userData?.level ?? '');
    const birthdate = normalizeBirthdate(userData?.birthdate);

    const fieldErrors = {};

    if (!normalizedEmail) {
      fieldErrors.email = 'البريد الإلكتروني مطلوب';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      fieldErrors.email = 'البريد الإلكتروني غير صحيح';
    } else if (users.some((candidate) => candidate.email.toLowerCase() === normalizedEmail)) {
      fieldErrors.email = 'هذا البريد مسجل بالفعل';
    }

    if (!normalizedPassword) {
      fieldErrors.password = 'كلمة المرور مطلوبة';
    } else if (normalizedPassword.length < 8) {
      fieldErrors.password = 'كلمة المرور يجب أن تكون 8 أحرف على الأقل';
    } else if (!/\d/.test(normalizedPassword)) {
      fieldErrors.password = 'كلمة المرور يجب أن تحتوي على رقم واحد على الأقل';
    }

    if (!trimmedName) {
      fieldErrors.name = 'الاسم مطلوب';
    } else if (trimmedName.length < 3) {
      fieldErrors.name = 'الاسم يجب أن يكون 3 أحرف على الأقل';
    }

    if (!birthdate?.day || !birthdate?.month || !birthdate?.year) {
      fieldErrors.birthdate = 'تاريخ الميلاد مطلوب';
    }

    if (!levelId || !levelLookup.has(levelId)) {
      fieldErrors.level = 'المرحلة الدراسية مطلوبة';
    }

    if (!userData?.termsAccepted) {
      fieldErrors.termsAccepted = 'يجب الموافقة على شروط الاستخدام';
    }

    if (Object.keys(fieldErrors).length > 0) {
      return { ok: false, fieldErrors };
    }

    const levelMeta = getLevelMeta(levelId);
    const profile = normalizeProfile({
      ...defaultProfile,
      ...userData,
      email: normalizedEmail,
      password: normalizedPassword,
      name: trimmedName,
      level: levelId,
      levelName: levelMeta.name,
      subLevel: levelMeta.subLevel,
      birthdate,
    });

    const storedAccount = {
      ...profile,
      password: normalizedPassword,
    };

    setUsers((currentUsers) => [...currentUsers, storedAccount]);
    persistLogin(profile);
    return { ok: true, user: profile };
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setLastVisitedLesson(null);
    setRecentLessons([]);
  };

  const value = useMemo(() => ({
    isLoggedIn,
    user,
    hydrated,
    users,
    lastVisitedLesson,
    recentLessons,
    login,
    register,
    logout,
    signIn: () => login(defaultCredentials.email, defaultCredentials.password),
    signOut: logout,
    setLastVisitedLesson,
    addRecentLesson: (lesson) => {
      setLastVisitedLesson(lesson);
      setRecentLessons((current) => {
        const next = [lesson, ...current.filter((item) => item.id !== lesson.id)];
        return next.slice(0, 6);
      });
    },
  }), [hydrated, isLoggedIn, user, users, lastVisitedLesson, recentLessons, login, register]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
}
