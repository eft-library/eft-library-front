export const CATEGORY_LIST = [
  { id: "issue", color: "bg-pink-600", ko: "인기글", ja: "人気", en: "Hot" },
  { id: "free", color: "bg-orange-600", ko: "자유", ja: "自由", en: "Free" },
  { id: "pvp", color: "bg-red-600", ko: "PVP", ja: "PVP", en: "PVP" },
  { id: "pve", color: "bg-green-600", ko: "PVE", ja: "PVE", en: "PVE" },
  { id: "info", color: "bg-blue-600", ko: "정보", ja: "情報", en: "Info" },
  {
    id: "question",
    color: "bg-violet-600",
    ko: "질문",
    ja: "質問",
    en: "Question",
  },
  {
    id: "humor",
    color: "bg-amber-500",
    ko: "유머",
    ja: "ユーモア",
    en: "Humor",
  },
];

export const SEARCH_CATEGORY = [
  { id: "all", ko: "통합검색", ja: "統合検索", en: "All" },
  { id: "title", ko: "제목", ja: "タイトル", en: "Title" },
  {
    id: "titleContent",
    ko: "제목+내용",
    ja: "タイトル+内容",
    en: "Title+Content",
  },
  { id: "comment", ko: "댓글", ja: "コメント", en: "Comment" },
  { id: "author", ko: "글쓴이", ja: "投稿者", en: "Author" },
];

export const MYPAGE_TAB_LIST = [
  { id: "profile", ko: "사용자 정보", link: "/mypage/profile" },
  { id: "posts", ko: "작성 글", link: "/mypage/posts" },
  { id: "comments", ko: "작성 댓글", link: "/mypage/comments" },
  { id: "bookmarks", ko: "북마크", link: "/mypage/bookmarks" },
  { id: "following", ko: "팔로잉", link: "/mypage/following" },
  { id: "blocked", ko: "차단 목록", link: "/mypage/blocked" },
  { id: "notifications", ko: "알림", link: "/mypage/notifications" },
];

// [ 아이콘만 쓸 거
//         { id: "profile", label: "사용자 정보", icon: User },
//         { id: "posts", label: "작성 글", icon: MessageSquare },
//         { id: "comments", label: "작성 댓글", icon: Reply },
//         { id: "bookmarks", label: "북마크", icon: Bookmark },
//         { id: "following", label: "팔로잉", icon: Users },
//         { id: "blocked", label: "차단 목록", icon: UserLock }, // UserX에서 UserLock으로 아이콘 변경
//         { id: "notifications", label: "알림", icon: Bell },
//       ]
