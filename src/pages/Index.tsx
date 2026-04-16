import { useState } from "react";
import Icon from "@/components/ui/icon";

const MOCK_USER = {
  name: "Алексей Громов",
  nickname: "@alexgromov",
  bio: "Дизайнер & визионер 🎨 Строю будущее пикселями и идеями",
  location: "Москва, Россия",
  website: "alexgromov.com",
  followers: 3842,
  following: 512,
  posts: 148,
  verified: true,
  coverGrad: "from-violet-600 via-pink-500 to-orange-400",
};

const MOCK_FEED = [
  {
    id: 1,
    user: { name: "Марина Светлова", nick: "@marina_s", avatar: "МС", color: "from-blue-500 to-cyan-400" },
    time: "2 мин назад",
    text: "Только что запустила новый проект — три месяца работы и вот результат! Если вы хотите что-то менять — начните прямо сейчас, не ждите идеального момента ✨",
    likes: 284,
    comments: 37,
    reposts: 12,
    liked: false,
    tags: ["#мотивация", "#запуск"],
  },
  {
    id: 2,
    user: { name: "Дмитрий Орлов", nick: "@dmitry_orl", avatar: "ДО", color: "from-emerald-500 to-teal-400" },
    time: "45 мин назад",
    text: "Сегодня встретил закат в горах. Природа умеет ставить всё на своё место 🏔️",
    likes: 521,
    comments: 64,
    reposts: 28,
    liked: true,
    tags: ["#природа", "#горы"],
  },
  {
    id: 3,
    user: { name: "Анна Кириллова", nick: "@anna_k", avatar: "АК", color: "from-pink-500 to-rose-400" },
    time: "1 час назад",
    text: "Разбираю новый стек технологий — голова кипит, но это так захватывающе! Кто ещё учится в удовольствие?",
    likes: 189,
    comments: 42,
    reposts: 8,
    liked: false,
    tags: ["#технологии", "#обучение", "#dev"],
  },
  {
    id: 4,
    user: { name: "Павел Зимин", nick: "@pzimin", avatar: "ПЗ", color: "from-orange-500 to-amber-400" },
    time: "3 часа назад",
    text: "Кофе + музыка + код = идеальное утро. Сегодня закрыл 12 задач из бэклога. Продуктивность на максимуме 🔥",
    likes: 367,
    comments: 29,
    reposts: 15,
    liked: false,
    tags: ["#продуктивность", "#код"],
  },
];

const MOCK_USERS = [
  { id: 1, name: "Марина Светлова", nick: "@marina_s", avatar: "МС", color: "from-blue-500 to-cyan-400", followers: "12.4K", mutual: 5, followed: false },
  { id: 2, name: "Дмитрий Орлов", nick: "@dmitry_orl", avatar: "ДО", color: "from-emerald-500 to-teal-400", followers: "8.1K", mutual: 3, followed: true },
  { id: 3, name: "Анна Кириллова", nick: "@anna_k", avatar: "АК", color: "from-pink-500 to-rose-400", followers: "24.7K", mutual: 8, followed: false },
  { id: 4, name: "Павел Зимин", nick: "@pzimin", avatar: "ПЗ", color: "from-orange-500 to-amber-400", followers: "3.2K", mutual: 1, followed: false },
  { id: 5, name: "Елена Новикова", nick: "@elena_nov", avatar: "ЕН", color: "from-violet-500 to-purple-400", followers: "16.9K", mutual: 11, followed: true },
  { id: 6, name: "Сергей Белов", nick: "@sbelov", avatar: "СБ", color: "from-red-500 to-pink-400", followers: "5.5K", mutual: 2, followed: false },
];

const TABS = [
  { id: "feed", label: "Лента", icon: "Home" },
  { id: "search", label: "Поиск", icon: "Search" },
  { id: "profile", label: "Профиль", icon: "User" },
];

function Avatar({ letters, gradient, size = "md" }: { letters: string; gradient: string; size?: "sm" | "md" | "lg" }) {
  const sizes = { sm: "w-9 h-9 text-xs", md: "w-12 h-12 text-sm", lg: "w-16 h-16 text-lg" };
  return (
    <div className={`${sizes[size]} rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center font-bold text-white shrink-0 font-golos`}>
      {letters}
    </div>
  );
}

function FeedPost({ post }: { post: typeof MOCK_FEED[0] }) {
  const [liked, setLiked] = useState(post.liked);
  const [likes, setLikes] = useState(post.likes);

  const toggleLike = () => {
    setLiked(!liked);
    setLikes(liked ? likes - 1 : likes + 1);
  };

  return (
    <div className="glass rounded-2xl p-5 hover-lift gradient-border">
      <div className="flex gap-3 mb-4">
        <Avatar letters={post.user.avatar} gradient={post.user.color} size="md" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-white text-sm">{post.user.name}</span>
            <span className="text-xs text-white/40">{post.user.nick}</span>
          </div>
          <span className="text-xs text-white/30">{post.time}</span>
        </div>
        <button className="text-white/30 hover:text-white/60 transition-colors">
          <Icon name="MoreHorizontal" size={18} />
        </button>
      </div>

      <p className="text-white/85 text-sm leading-relaxed mb-3">{post.text}</p>

      <div className="flex flex-wrap gap-1 mb-4">
        {post.tags.map(tag => (
          <span key={tag} className="text-xs px-2 py-0.5 rounded-full text-violet-300 bg-violet-500/15 font-medium">{tag}</span>
        ))}
      </div>

      <div className="flex items-center gap-5 pt-3 border-t border-white/6">
        <button
          onClick={toggleLike}
          className={`flex items-center gap-1.5 text-sm transition-all hover:scale-110 ${liked ? "text-pink-400" : "text-white/40 hover:text-pink-400"}`}
        >
          <Icon name="Heart" size={16} />
          <span>{likes.toLocaleString()}</span>
        </button>
        <button className="flex items-center gap-1.5 text-sm text-white/40 hover:text-blue-400 transition-all hover:scale-110">
          <Icon name="MessageCircle" size={16} />
          <span>{post.comments}</span>
        </button>
        <button className="flex items-center gap-1.5 text-sm text-white/40 hover:text-emerald-400 transition-all hover:scale-110">
          <Icon name="Repeat2" size={16} />
          <span>{post.reposts}</span>
        </button>
        <button className="ml-auto text-white/30 hover:text-white/60 transition-colors">
          <Icon name="Bookmark" size={16} />
        </button>
      </div>
    </div>
  );
}

function FeedTab() {
  return (
    <div className="space-y-4">
      <div className="glass rounded-2xl p-4">
        <div className="flex gap-3 items-center">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-500 via-pink-500 to-orange-400 flex items-center justify-center font-bold text-white text-sm shrink-0">АГ</div>
          <div className="flex-1 bg-white/5 rounded-xl px-4 py-3 text-white/40 text-sm cursor-pointer hover:bg-white/8 transition-colors">
            Поделитесь чем-нибудь...
          </div>
          <button className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center neon-glow hover:scale-105 transition-transform">
            <Icon name="Plus" size={18} className="text-white" />
          </button>
        </div>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-1">
        {[
          { name: "Вы", color: "from-violet-500 to-pink-500", letters: "АГ", active: true },
          { name: "marina_s", color: "from-blue-500 to-cyan-400", letters: "МС", active: true },
          { name: "dmitry", color: "from-emerald-500 to-teal-400", letters: "ДО", active: false },
          { name: "anna_k", color: "from-pink-500 to-rose-400", letters: "АК", active: true },
          { name: "pzimin", color: "from-orange-500 to-amber-400", letters: "ПЗ", active: false },
          { name: "elena", color: "from-violet-500 to-purple-400", letters: "ЕН", active: true },
        ].map((s, i) => (
          <div key={i} className="flex flex-col items-center gap-1.5 shrink-0 cursor-pointer group">
            <div className={`w-14 h-14 rounded-full p-0.5 ${s.active ? "bg-gradient-to-br from-violet-500 via-pink-500 to-orange-400" : "bg-white/10"}`}>
              <div className="w-full h-full rounded-full bg-[#0b0b12] p-0.5">
                <Avatar letters={s.letters} gradient={s.color} size="sm" />
              </div>
            </div>
            <span className="text-[10px] text-white/50 group-hover:text-white/80 transition-colors truncate w-14 text-center">{s.name}</span>
          </div>
        ))}
      </div>

      {MOCK_FEED.map((post, i) => (
        <div key={post.id} style={{ animationDelay: `${i * 0.08}s`, opacity: 0 }} className="animate-slide-up">
          <FeedPost post={post} />
        </div>
      ))}
    </div>
  );
}

function SearchTab() {
  const [query, setQuery] = useState("");
  const [followStates, setFollowStates] = useState<Record<number, boolean>>(
    Object.fromEntries(MOCK_USERS.map(u => [u.id, u.followed]))
  );

  const filtered = MOCK_USERS.filter(u =>
    query === "" ||
    u.name.toLowerCase().includes(query.toLowerCase()) ||
    u.nick.toLowerCase().includes(query.toLowerCase())
  );

  const toggleFollow = (id: number) => {
    setFollowStates(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40">
          <Icon name="Search" size={18} />
        </div>
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Поиск по имени или никнейму..."
          className="w-full glass rounded-2xl pl-11 pr-10 py-4 text-white placeholder:text-white/30 text-sm outline-none focus:border-violet-500/50 transition-colors"
        />
        {query && (
          <button onClick={() => setQuery("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors">
            <Icon name="X" size={16} />
          </button>
        )}
      </div>

      <div className="flex gap-2 flex-wrap">
        {["Все", "Дизайнеры", "Разработчики", "Маркетинг", "Музыканты"].map((tag, i) => (
          <button key={tag} className={`text-xs px-3 py-1.5 rounded-full font-medium transition-all hover:scale-105 ${i === 0 ? "bg-gradient-to-r from-violet-500 to-pink-500 text-white neon-glow" : "glass text-white/50 hover:text-white/80"}`}>
            {tag}
          </button>
        ))}
      </div>

      <p className="text-xs text-white/30 font-medium uppercase tracking-wider px-1">
        {query ? `Найдено: ${filtered.length}` : "Рекомендуем"}
      </p>

      <div className="space-y-3">
        {filtered.map((user, i) => (
          <div key={user.id} className="glass rounded-2xl p-4 flex items-center gap-4 hover-lift animate-slide-up" style={{ animationDelay: `${i * 0.07}s`, opacity: 0 }}>
            <Avatar letters={user.avatar} gradient={user.color} size="md" />
            <div className="flex-1 min-w-0">
              <span className="font-semibold text-white text-sm block">{user.name}</span>
              <span className="text-xs text-white/40">{user.nick}</span>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-xs text-white/30">{user.followers} подписчиков</span>
                {user.mutual > 0 && <span className="text-xs text-violet-400">· {user.mutual} общих</span>}
              </div>
            </div>
            <button
              onClick={() => toggleFollow(user.id)}
              className={`text-xs px-4 py-2 rounded-xl font-semibold transition-all hover:scale-105 shrink-0 ${followStates[user.id] ? "glass text-white/60 border border-white/15" : "bg-gradient-to-r from-violet-500 to-pink-500 text-white neon-glow"}`}
            >
              {followStates[user.id] ? "Читаю" : "Читать"}
            </button>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <div className="text-5xl mb-4">🔍</div>
          <p className="text-white/50 text-sm">Ничего не найдено по запросу</p>
          <p className="text-white/30 text-xs mt-1">«{query}»</p>
        </div>
      )}
    </div>
  );
}

function ProfileTab() {
  const [activeSection, setActiveSection] = useState<"posts" | "activity">("posts");

  const stats = [
    { label: "Посты", value: MOCK_USER.posts },
    { label: "Читатели", value: MOCK_USER.followers.toLocaleString() },
    { label: "Читаю", value: MOCK_USER.following },
  ];

  return (
    <div className="space-y-4">
      <div className="glass rounded-3xl overflow-hidden gradient-border">
        <div className={`h-32 bg-gradient-to-r ${MOCK_USER.coverGrad} relative`}>
          <div className="absolute inset-0 opacity-20" style={{backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")"}} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
          <button className="absolute top-3 right-3 w-8 h-8 glass-strong rounded-lg flex items-center justify-center">
            <Icon name="Camera" size={14} className="text-white" />
          </button>
        </div>

        <div className="px-5 pb-5">
          <div className="flex items-end justify-between -mt-10 mb-4">
            <div className="relative">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-500 via-pink-500 to-orange-400 p-0.5 neon-glow">
                <div className="w-full h-full rounded-[14px] bg-[#0b0b12] flex items-center justify-center text-white font-bold text-xl font-golos">АГ</div>
              </div>
              {MOCK_USER.verified && (
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-br from-violet-500 to-pink-500 rounded-full flex items-center justify-center">
                  <Icon name="Check" size={12} className="text-white" />
                </div>
              )}
            </div>
            <button className="glass border border-white/15 text-white/80 text-xs px-4 py-2 rounded-xl hover:bg-white/10 transition-colors font-medium">
              Редактировать
            </button>
          </div>

          <div className="mb-3">
            <h2 className="text-lg font-bold text-white">{MOCK_USER.name}</h2>
            <p className="text-sm text-white/40">{MOCK_USER.nickname}</p>
          </div>

          <p className="text-sm text-white/70 leading-relaxed mb-4">{MOCK_USER.bio}</p>

          <div className="flex items-center gap-4 mb-4 text-xs text-white/40">
            <span className="flex items-center gap-1.5"><Icon name="MapPin" size={12} />{MOCK_USER.location}</span>
            <span className="flex items-center gap-1.5"><Icon name="Link" size={12} /><span className="text-violet-400">{MOCK_USER.website}</span></span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {stats.map(stat => (
              <div key={stat.label} className="bg-white/5 rounded-xl p-3 text-center hover:bg-white/8 transition-colors cursor-pointer">
                <div className="text-lg font-bold gradient-text">{stat.value}</div>
                <div className="text-xs text-white/40 mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="glass rounded-2xl p-4">
        <p className="text-xs text-white/40 uppercase tracking-wider font-semibold mb-3">Достижения</p>
        <div className="flex gap-3">
          {[
            { emoji: "🔥", label: "Топ автор" },
            { emoji: "⭐", label: "Верифицирован" },
            { emoji: "💎", label: "Премиум" },
            { emoji: "🚀", label: "Ранний доступ" },
          ].map(badge => (
            <div key={badge.label} className="flex flex-col items-center gap-1 flex-1 p-2 rounded-xl bg-white/4 hover:bg-white/6 transition-colors cursor-pointer">
              <span className="text-xl">{badge.emoji}</span>
              <span className="text-[9px] text-white/50 text-center leading-tight">{badge.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="glass rounded-2xl overflow-hidden">
        <div className="flex border-b border-white/8">
          {([["posts", "Посты"], ["activity", "Активность"]] as const).map(([id, label]) => (
            <button
              key={id}
              onClick={() => setActiveSection(id)}
              className={`flex-1 py-3 text-sm font-semibold transition-colors ${activeSection === id ? "gradient-text border-b-2 border-violet-500" : "text-white/40 hover:text-white/60"}`}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="p-4 space-y-3">
          {activeSection === "posts" ? (
            MOCK_FEED.slice(0, 2).map(post => (
              <div key={post.id} className="bg-white/4 rounded-xl p-4 hover:bg-white/6 transition-colors cursor-pointer">
                <p className="text-sm text-white/70 line-clamp-2">{post.text}</p>
                <div className="flex items-center gap-3 mt-2 text-xs text-white/30">
                  <span className="flex items-center gap-1"><Icon name="Heart" size={11} /> {post.likes}</span>
                  <span className="flex items-center gap-1"><Icon name="MessageCircle" size={11} /> {post.comments}</span>
                  <span className="ml-auto">{post.time}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="space-y-2">
              {[
                { icon: "Heart", text: "Вы лайкнули пост Марины Светловой", time: "2 мин назад", color: "text-pink-400" },
                { icon: "UserPlus", text: "Дмитрий Орлов подписался на вас", time: "1 час назад", color: "text-violet-400" },
                { icon: "MessageCircle", text: "Анна Кириллова ответила на ваш комментарий", time: "3 часа назад", color: "text-blue-400" },
                { icon: "Repeat2", text: "Павел Зимин сделал репост вашего поста", time: "Вчера", color: "text-emerald-400" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-white/4 rounded-xl hover:bg-white/6 transition-colors cursor-pointer">
                  <div className={item.color}><Icon name={item.icon} size={16} fallback="Bell" /></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-white/70 leading-relaxed">{item.text}</p>
                    <p className="text-[10px] text-white/30 mt-0.5">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Index() {
  const [activeTab, setActiveTab] = useState("feed");

  return (
    <div className="min-h-screen bg-[#0b0b12] font-golos">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-violet-600/15 blur-[120px] animate-pulse-slow" />
        <div className="absolute top-[30%] right-[-15%] w-[500px] h-[500px] rounded-full bg-pink-600/12 blur-[100px] animate-pulse-slow" style={{ animationDelay: "2s" }} />
        <div className="absolute bottom-[-10%] left-[20%] w-[400px] h-[400px] rounded-full bg-blue-600/10 blur-[100px] animate-pulse-slow" style={{ animationDelay: "4s" }} />
      </div>

      <header className="sticky top-0 z-50 glass-strong border-b border-white/8">
        <div className="max-w-lg mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 via-pink-500 to-orange-400 flex items-center justify-center neon-glow">
              <span className="text-white font-bold text-sm">P</span>
            </div>
            <span className="font-bold text-white text-lg tracking-tight">Pulse</span>
          </div>
          <div className="flex items-center gap-2">
            <button className="w-9 h-9 glass rounded-xl flex items-center justify-center text-white/50 hover:text-white transition-colors relative">
              <Icon name="Bell" size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-pink-500 rounded-full" />
            </button>
            <button className="w-9 h-9 glass rounded-xl flex items-center justify-center text-white/50 hover:text-white transition-colors">
              <Icon name="Settings" size={18} />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-5 pb-28 relative z-10">
        {activeTab === "feed" && <FeedTab />}
        {activeTab === "search" && <SearchTab />}
        {activeTab === "profile" && <ProfileTab />}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 z-50 glass-strong border-t border-white/8">
        <div className="max-w-lg mx-auto px-4 h-20 flex items-center justify-around pb-2">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="flex flex-col items-center gap-1 px-6 py-2 rounded-2xl transition-all"
            >
              {activeTab === tab.id ? (
                <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-pink-500 rounded-xl flex items-center justify-center neon-glow scale-105">
                  <Icon name={tab.icon} size={20} className="text-white" fallback="Home" />
                </div>
              ) : (
                <div className="w-10 h-10 flex items-center justify-center text-white/40 hover:text-white/60 transition-colors">
                  <Icon name={tab.icon} size={20} fallback="Home" />
                </div>
              )}
              <span className={`text-[10px] font-semibold transition-colors ${activeTab === tab.id ? "gradient-text" : "text-white/40"}`}>
                {tab.label}
              </span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}