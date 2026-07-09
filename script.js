let currentLang = "zh";
let currentQuestionIndex = 0;
let scores = {};
let userAnswers = [];
const ORDER_FORM_URL = "https://tally.so/r/PdyW4b";

function trackEvent(eventName, params = {}) {
  if (typeof gtag === "function") {
    gtag("event", eventName, params);
  }
}

//12种人格资料
const personalities = {
  pypfinder: {
  name: "PYP Finder",
  image: "poster/pyp-finder.jpg",

  zh: {
    title: "传说中的 PYP 战神",
    description: "考试前永远比老师更懂题型，PYP、答案、考点全都在你的掌控范围内。",
    tags: ["高效复习", "考前清醒", "资料收集王"]
  },  

  en: {
    title: "The Legendary PYP Warrior",
    description: "You know past-year papers better than the lecturer knows the exam format.",
    tags: ["Exam Strategist", "PYP Collector", "Calm Before Finals"]
  }
},

  ddlfighter: {
  name: "DDL Fighter",
  image: "poster/Due-fighter.jpg",

  zh: {
    title: "极限赶 due 战士",
    description: "平时看似风平浪静，DDL 前夜突然觉醒。你擅长在最后几个小时爆发惊人效率，用咖啡、意志力和一点点玄学把任务硬生生救回来。",
    tags: ["极限爆发", "熬夜赶工", "死线战神"]
  },

  en: {
    title: "Last-Minute Deadline Warrior",
    description: "You may look calm most of the time, but once the deadline gets close, your survival mode switches on. Fueled by caffeine, pressure, and pure willpower, you somehow manage to pull everything together at the very last moment.",
    tags: ["Deadline Mode", "Late-Night Grind", "Pressure Player"]
  }
},

  careerfairghost: {
    name: "Career Fair Ghost",
    image: "poster/career-fair-ghost.jpg",

    zh: {
      title: "Career Fair 幽灵出没",
      description: "你总是出现在每一场 career fair，熟练领取周边、扫码、假装自信聊天，然后在 HR 问 career plan 时原地灵魂出窍。",
      tags: ["求职焦虑", "Tote Bag 收集者", "LinkedIn 潜水"]
    },

    en: {
      title: "Haunting Every Career Fair",
      description: "You appear at every career fair, collect tote bags, scan QR codes, pretend to be confident, and spiritually leave your body when HR asks about your career plan.",
      tags: ["Career Anxiety", "Tote Bag Collector", "LinkedIn Lurker"]
    }
  },
  
  waveresidence: {
    name: "Wave Residence",
    image: "poster/wave-residence.jpg",

    zh: {
      title: "健身房常驻人口",
      description: "健身房、泳池和球场才是你的第二个宿舍。",
      tags: ["健身达人", "精力充沛", "运动型人格"]
    },

    en: {
      title: "Permanent Resident of The Wave",
      description: "The gym, pool, and courts are basically your second hall room.",
      tags: ["Fitness Energy", "Always Moving", "Sporty Mode"]
    }
  },

  lovestruck: {
    name: "Love Struck",
    image: "poster/love-struck.jpg",

    zh: {
      title: "恋爱脑",
      description: "NTU 再大，也比不过 TA 的一条消息。",
      tags: ["心动雷达", "消息敏感", "浪漫主义"]
    },

     en: {
      title: "The Hopeless Romantic Lion",
      description: "NTU may be huge, but one message from them still matters more than the whole campus.",
      tags: ["Heart Radar", "Message Sensitive", "Romantic Energy"]
    }
  },

  starchaser: {
    name: "Star Chaser",
    image: "poster/star-chaser.jpg",

    zh: {
      title: "追星能量补给站",
      description: "舞台、应援、演唱会，是你的精神续命方式。",
      tags: ["应援专家", "舞台雷达", "精神补给"]
    },

    en: {
      title: "Powered by Fandom Energy",
      description: "Stages, fan support, and concerts are your emotional charging stations.",
      tags: ["Fan Energy", "Stage Radar", "Emotional Recharge"]
    }
  },

  esportsfanatic: {
    name: "E-sports Fanatic",
    image: "poster/E-sports Fanatic.jpg",

    zh: {
      title: "宿舍开黑核心成员",
      description: "嘴上说打一把，实际天亮还在排位。",
      tags: ["开黑选手", "排位战神", "手速在线"]
    },

     en: {
      title: "The Core Member of Every Hall Gaming Squad",
      description: "You say one more game, but somehow it is already sunrise.",
      tags: ["Gaming Squad", "Ranked Warrior", "Fast Hands"]
    }
  },

  pantryalchemist: {
    name: "Pantry Alchemist",
    image: "poster/Pantry-Alchemist.jpg",

    zh: {
      title: "宿舍厨房炼金术士",
      description: "NTU 隐藏大厨，pantry 就是你的主场。",
      tags: ["宿舍大厨", "泡面升级师", "生活感满满"]
    },

    en: {
      title: "The Hall Pantry Magician",
      description: "A hidden NTU chef. The pantry is your battlefield.",
      tags: ["Hall Chef", "Noodle Upgrader", "Comfort Food Energy"]
    }
  },

  hallhermit: {
    name: "Hall Hermit",
    image: "poster/hall-hermit.jpg",

  zh: {
      title: "宿舍结界守护者",
      description: "活动范围主要是床、厕所和冰箱。",
      tags: ["宿舍回血", "低电量模式", "安静生活"]
    },

  en: {
      title: "Guardian of the Hall Room Barrier",
      description: "Your main activity zones are the bed, the bathroom, and the fridge.",
      tags: ["Room Recharge", "Low Battery Mode", "Quiet Life"]
    }
  },

  eventnpc: {
    name: "Event NPC",
    image: "poster/event-npc.jpg",

    zh: {
      title: "校园活动固定刷新",
      description: "哪里有活动，哪里就有你的身影。",
      tags: ["活动雷达", "Free Food 猎人", "社交在线"]
    },
    en: {
      title: "Always Spawning at Campus Events",
      description: "Wherever there is an event, there you are.",
      tags: ["Event Radar", "Free Food Hunter", "Social Mode"]
    }
  },

  ntuloster: {
    name: "NTU Loster",
    image: "poster/ntu-loster.jpg",
    
    zh: {
      title: "常驻校外的旅行家",
      description: "时刻准备着逃离NTU。",
      tags: ["校外常驻", "旅行雷达", "City Walk 玩家"]
    },
    en: {
      title: "The Off-Campus Wanderer",
      description: "You are constantly ready to escape from NTU.",
      tags: ["Off-Campus Regular", "Travel Radar", "City Walk Explorer"]
    }
  },

  dormmixologist: {
    name: "Dorm Mixologist",
    image: "poster/dormmixologist.jpg",

     zh: {
      title: "宿舍微醺调酒师",
      description: "快乐加冰，微醺续命。",
      tags: ["微醺玩家", "宿舍调饮", "氛围制造机"]
    },
  
    en: {
      title: "The Hall Room Drink Crafter",
      description: "Happiness on ice, surviving campus life one small drink at a time.",
      tags: ["Tipsy Energy", "Dorm Drinks", "Mood Maker"]
    }
  }
};

function normalizeType(type) {
  const typeMap = {
    pypFinder: "pypfinder",
    pypfinder: "pypfinder",

    dueFighter: "ddlfighter",
    duefighter: "ddlfighter",
    deadlineFighter: "ddlfighter",
    ddlfighter: "ddlfighter",

    careerFairGhost: "careerfairghost",
    careerfairghost: "careerfairghost",

    waveResidence: "waveresidence",
    waveresidence: "waveresidence",
    "wave residence": "waveresidence",

    loveBrain: "lovestruck",
    lovebrain: "lovestruck",
    lovestruck: "lovestruck",

    starChaser: "starchaser",
    starchaser: "starchaser",

    esportsFanatic: "esportsfanatic",
    esportsfanatic: "esportsfanatic",

    hallChef: "pantryalchemist",
    hallchef: "pantryalchemist",
    pantryalchemist: "pantryalchemist",

    hallHermit: "hallhermit",
    hallhermit: "hallhermit",

    eventNPC: "eventnpc",
    eventnpc: "eventnpc",

    ntuLoster: "ntuloster",
    ntuloster: "ntuloster",

    dormMixologist: "dormmixologist",
    dormmixologist: "dormmixologist"
  };

  return typeMap[type] || type;
}

// 中英文题库
const quizData = {

  zh: {
    questions: [
      {
        text: "如果 NTU 是一场游戏，你的主线任务是？",
        options: [
          { text: "收集PYP，拿最高的GPA", type: "pypfinder" },
          { text: "世界那么大，我想去看看", type: "ntuloster" },
          { text: "躲在宿舍回血，拒绝无意义社交伤害", type: "hallhermit" },
          { text: "每天参加event，寻找free food", type: "eventnpc" }
        ]
      },
      {
        text: "面对一封标题为“Important Reminder”的邮件，你的第一反应是？",
        options: [
          { text: "直到DDL提醒再打开", type: "ddlfighter", weight: 2 },
          { text: "看看有没有 career fair", type: "careerfairghost" },
          { text: "截图发给喜欢的人，假装自己很忙", type: "lovestruck" },
          { text: "勿扰模式ing", type: "hallhermit" }
        ]
      },
      {
        text: "在王者荣耀中，如果你想玩小乔，请问你应该ban谁？",
        options: [
        {
        text: "安琪拉",
        type: "esportsfanatic",
        weight: 0
        },
        {
        text: "少司缘",
        type: "esportsfanatic",
        weight: 2
        },
        {
        text: "兰陵王",
        type: "esportsfanatic",
        weight: 2
        }, 
        {
        text: "哪个顺眼ban哪个",
        type: "esportsfanatic",
        weight: 0
        },       
        ]
      },
      {
        text: "如果电脑突然黑屏，你会？",
        options: [
          { text: "开始刷手机", type: "hallhermit" },
          { text: "懊恼自己刚写完的PYP", type: "pypfinder" },
          { text: "继续看idol舞台Live，世界毁灭也要先看完", type: "starchaser" },
          { text: "我的百万撤离？？？", type: "esportsFanatic" }
        ]
      },
      {
        text: "如果朋友说今晚想喝一杯 Negroni，请问最经典的组合是哪一组？",
        options: [
          {
          text: "Gin / Campari / Sweet Vermouth",
          type: "dormmixologist",
          weight: 2
          },
          {
          text: "Vodka / Orange Juice / Sprite",
          type: "dormmixologist",
          weight: 1
          },
          {
          text: "I  / DON'T / KNOW",
          type: "dormmixologist",
          weight: 0
          },
          {
          text: "Milk / Coffee / Ice",
          type: "pantryalchemist",
          weight: 0
          }
        ]
      },
      {
        text: "你将获得一个隐藏技能，但只能使用一次，你会选哪个？",
        options: [
          { text: "让心仪的公司聘用自己", type: "careerfairghost" },
          { text: "让自己喜欢的人爱上你", type: "loestruck" },
          { text: "让自己本学期的GPA变为5.0", type: "eventnpc" },
          { text: "立刻传送到自己想去的地方", type: "ntuloster" }
        ]
      },
      {
        text: "BLACKPINK 的 EP《DEADLINE》包含以下哪一组歌曲？",
        options: [
        {
        text: "JUMP / GO / Me and my / Champion / Fxxxboy",
        type: "starChaser",
        weight: 2
        },
        {
        text: "Pink Venom / GO / Me and my / Fxxxboy / The Happiest Girl",
        type: "starChaser",
        weight: 0
        },
        {
        text: "JUMP / GO / Me and my / Forever Young / Fxxxboy / The Happiest Girl",
        type: "starChaser",
        weight: 0
        },
        {
        text: "Pink Venom / Champion / Forever Young / Fxxxboy / The Happiest Girl",
        type: "starChaser",
        weight: 0
        },
        ]
      },
      {
        text: "你认为NTU最美味的食物是？",
        options: [
          { text: "杂菜饭", type: "ddlfighter" },
          { text: "麦当劳", type: "pypfinder" },
          { text: "自己做的黑暗料理", type: "pantryalchemist" },
          { text: "JP的Monster Curry", type: "ntuloster" }
        ]
      },
      {
        text: "如果今天是休息日，你会做什么？",
        options: [
          { text: "去Johor Bahru度假", type: "ntuloster" },
          { text: "躲在宿舍里", type: "hallhermit" },
          { text: "尝试黑暗料理", type: "pantryalchemist" },
          { text: "出去找兼职", type: "careerfairghost" }
        ]
      },
      {
        text: "当你看到AIA又在event时，你的反应是？",
        options: [
          { 
          text: "寻找奖品",
          type: "eventnpc",
          weight: 2
          },
          { 
          text: "一想到今天有due，默默的走向LWN Library", 
          type: "ddlfighter",
          weight: 2
          },
          { 
          text: "默默走开",
          type: "hallhermit",
          weight: 2
          },
          { 
          text: "在心里暗骂：太吵了", 
          type: "pypfinder",
          weight: 2
          }
        ]
      },
      {
        text: "请问CC1中三个assignment的成绩占比分别是多少？",
        options: [
          { 
          text: "15% / 25% / 60%",
          type: "pypfinder",
          weight: 0
          },
          { 
          text: "20% / 25% / 40%", 
          type: "pypfinder", 
          weight: 2
          },
          { 
          text: "15% / 20% / 45%",
          type: "pypfinder",
          weight: 0
          },
          { 
          text: "20% / 30% / 40%", 
          type: "pypfinder",
          weight: 0
          }
        ]
      },
      {
        text: "NTU校园里你最喜欢的地方是？",
        options: [
          { text: "自己温馨的房间", type: "hallhermit" },
          { text: "The Wave", type: "wave residence" },
          { text: "AIA CANOPY", type: "eventnpc" },
          { text: "Yunnan Garden", type: "ntuloster" }
        ]
      },
      {
        text: "你最容易因为什么突然精神起来？",
        options: [
          { text: "明天有Career Fair", type: "careerfairghost" },
          { text: "上号，上号", type: "esportsfanatic" },
          { text: "今天演唱会门票预售", type: "starchaser" },
          { text: "今天晚上喝8+1", type: "dormmixologist" }
        ]
      },
      {
        text: "早晨醒来，你发现自己即将错过CC课，你此刻的心情是:",
        options: [
          { text: "翻个身，再睡个回笼觉", type: "hallhermit" },
          { text: "急忙给prof发邮件道歉", type: "pypfinder" },
          { text: "该吃早饭了", type: "pantryalchemist" },
          { text: "来把游戏压压惊", type: "esportsfanatic" }
        ]
      },
      {
        text: "请问泳池每周固定的清理时间是？",
        options: [
          { 
          text: "Thursday 2-5pm", 
          type: "waveresidence",
          weight: 0
          },
          { 
          text: "Tuesday 2-5pm",
          type: "waveresidence",
          weight: 0
          },
          {
          text: "Monday 2-5pm", 
          type: "waveresidence",
          weight: 2
          },
          { 
          text: "On the weekend", 
          type: "waveresidence",
          weight: 0
          }
        ]
      },
      {
      text: "如果调酒时配方里有果汁、蛋清或奶油，你会怎么处理？",
      options: [
      { 
      text: "Shake it：直接摇到杯子里出现灵魂泡沫",
      type: "dormmixologist",
      weight: 2
      },
      {
      text: "Stir it：安静搅拌",
      type: "dormmixologist",
      weight: 0
      },
      {
      text: "Blend it：放进搅拌机",
      type: "pantryalchemist",
      weight: 1
      },
      {
      text: "iced it：倒满冰块",
      type: "hallhermit",
      weight: 0
      }
    ]
  },
      {
        text: "Group Project中，你的状态通常是？",
        options: [
          { text: "疲惫", type: "pypfinder" },
          { text: "元气满满", type: "waveresidence" },
          { text: "闭关", type: "hallhermit" },
          { text: "浪", type: "ntuloster" }
        ]
      },
      {
        text: "如果“ta”在点赞时跳过了你的朋友圈，你会？",
        options: [
          { 
          text: "仔细思考，陷入内耗之中",
          type: "lovestruck",
          weight: 2
          },
          { 
          text: "开一把游戏，假装自己毫不在意",
          type: "esportsfanatic",
          weight: 1
          },
          { 
          text: "借酒消愁", 
          type: "dormmixologist",
          weight: 2
          },
          { 
          text: "主动找“ta”聊天，试图一探究竟", 
          type: "lovestruck",
          weight: 2
          }
        ]
      }, 
      {
        text: "请问你在NTU平时最喜欢的饮品是？",
        options: [
          { 
          text: "Lemon Tea", 
          type: "pantryalchemist",
          weight: 2
          },
          { 
          text: "Mi Xue",
          type: "pantryalchemist",
          weight: 0
          },
          { 
          text: "Chagee", 
          type: "hallhermit",
          weight: 1 
          },
          { 
          text: "Free Drink", 
          type: "eventnpc", 
          weight: 1
          }
        ]
      },
      {
        text: "你最可能以下哪个时间发朋友圈？",
          options: [
          { text: "健身日", type: "waveresidence" },
          { text: "每一天", type: "eventnpc" },
          { text: "final前一天", type: "ddlfighter"},
          { text: "情人节", type: "lovestruck" }
        ]
      },  

      {
        text: "recess week你通常做什么？",
        options: [
          { text: "在床上躺一周", type: "hallhermit" },
          { text: "按规律健身", type: "waveresidence" },
          { text: "来一场说走就走的旅行", type: "ntuloster" },
          { text: "打一周王者", type: "esportsfanatic" }
        ]
      },    
      {
        text: "请问以下四项活动中，你最感兴趣是哪一项",
        options: [
          { 
          text: "王者荣耀挑战者杯总决赛", 
          type: "esportsfanatic",
          weight: 2
          },
          { 
          text: "CCG EXPO 2026",
          type: "ntuloster",
          weight: 2 
          },
          { 
          text: "邓紫棋演唱会开票",
          type: "starchaser",
          weight: 2
          },
          {
          text: "人工智能科技博览会",
          type: "careerfairghost",
          weight: 2 
          }
        ]
      },
      {
        text: "请问你最长可以在家宅多久？",
        options: [
          { text: "每天都要出门锻炼", type: "waveresidence" },
          { text: "3天以内", type: "pantryalchemist" },
          { text: "一周以上", type: "hallhermit" },
          { text: "想多久就多久", type: "esportsfanatic" }
        ]
      },
      {
        text: "无氧器械训练中，如果你的目标是增肌，请问一组多少次比较合理？",
        options: [
          { 
          text: "6-8次",
          type: "waveresidence",
          weight: 0
          },
          { 
          text: "8-12次",
          type: "waveresidence",
          weight :2
          },
          { 
          text: "12-15次",
          type: "waveresidence", 
          weight: 1  
          },
          { 
            text: "因人而异", 
            type: "waveresidence",
            weight :0
          }
        ]
      },
      {
        text: "如果距离assignment deadline只剩下6小时，你会怎么做？",
        options: [
          {text: "gpt老师保佑我", type: "ddlfighter"},
          {text: "用Medical Certificate躲避DDL", type: "ddlfighter"},
          {text: "等待期末FGO这门课", type: "hallhermit"},
          {text: "借酒消愁", type: "dormmixologist"}
        ]
      },

      {
        text: "NTU的orientation你通常在做什么？",
        options: [
          { text: "有这功夫不如预习一下课本", type: "pypfinder" },
          { text: "把自己关在宿舍，生人勿近", type: "hallhermit" },
          { text: "新加坡太无聊了，直接飞去别的国家", type: "ntuloster" },
          { text: "e人属性大爆发，疯狂添加同学ins", type: "eventnpc" }
        ]
      },
      {
        text: "如果以下四本爽文摆在面前，你会选择哪本？",
        options: [
          { text: "《重生之DDL前一小时我解锁了最强ai》", type: "ddlfighter" },
          { text: "《重生之我的移动NTU城堡》", type: "ntuloster" },
          { text: "《重生之我靠杂菜饭月入百万》", type: "esportsfanatic" },
          { text: "《重生之全校学生爱上我》", type: "lovestruck" }
        ]
      },
    ]
  },

  en: {
    questions: [
      {
      text: "If NTU were an open-world game, what would be your main quest ?",
      options: [
        { text: "Find Past year Papers and speedrun the highest GPA.", type: "pypfinder" },
        { text: "The world is huge, and I need to see it.", type: "ntuloster" },
        { text: "Hide in hall, avoid unnecessary social damage.", type: "hallhermit" },
        { text: "Spawn at every event and hunt for free food.", type: "eventnpc" }
      ]
      },
      {
      text: "When you see an email titled “Important Reminder”, what is your first reaction?",
      options: [
        { text: "Open it until the DDL starts screaming at me.", type: "ddlfighter",weight:2 },
        { text: "Check if there is a career fair inside.", type: "careerfairghost" },
        { text: "Screenshot it to my crush so I look busy.", type: "lovestruck" },
        { text: "Do Not Disturb Me.", type: "hallhermit" }
      ]
      },
      {
      text: "In Honor of Kings, if you want to lock Xiao Qiao, who should you ban?",
      options: [
        {
          text: "Angela",
          type: "esportsfanatic",
          weight: 0
        },
        {
          text: "Shao Siyuan",
          type: "esportsfanatic",
          weight: 2
        },
        {
          text: "Prince of Lanling",
          type: "esportsfanatic",
          weight: 2
        },
        {
          text: "Empty ban slot",
          type: "esportsfanatic",
          weight: 0
        }
      ]
      },
      {
      text: "If your laptop suddenly black-screens, what do you do?",
      options: [
        { text: "Start scrolling on my phone.", type: "hallhermit" },
        { text: "Angry with the PYP I just finished writing.", type: "pypfinder" },
        { text: "Keep watching my idol’s live stage. The world can end after this performance.", type: "starchaser" },
        { text: "My computer game still running???", type: "esportsfanatic" }
      ]
      },
      {
      text: "Your friend says they want a Negroni tonight. What is the classic combo?",
      options: [
        {
          text: "Gin / Campari / Sweet Vermouth",
          type: "dormmixologist",
          weight: 2
        },
        {
          text: "Vodka / Orange Juice / Sprite",
          type: "dormmixologist",
          weight: 1
        },
        {
          text: "I / DON'T / KNOW",
          type: "dormmixologist",
          weight: 0
        },
        {
          text: "Milk / Coffee / Ice",
          type: "pantryalchemist",
          weight: 0
        }
      ]
      },
      {
      text: "You get one hidden skill, but you can only use it once. Which one are you choosing?",
      options: [
        { text: "Make my dream company hire me instantly", type: "careerfairghost" },
        { text: "Make the person I like fall for me immediately", type: "lovestruck" },
        { text: "Turn my GPA this semester into 5.0", type: "eventnpc" },
        { text: "Teleport to anywhere I actually want to be", type: "ntuloster" }
      ]
      },
      {
      text: "Which tracklist belongs to BLACKPINK’s EP DEADLINE?",
      options: [
        {
          text: "JUMP / GO / Me and my / Champion / Fxxxboy",
          type: "starchaser",
          weight: 2
        },
        {
          text: "Pink Venom / GO / Me and my / Fxxxboy / The Happiest Girl",
          type: "starchaser",
          weight: 0
        },
        {
          text: "JUMP / GO / Me and my / Forever Young / Fxxxboy / The Happiest Girl",
          type: "starchaser",
          weight: 0
        },
        {
          text: "Pink Venom / Champion / Forever Young / Fxxxboy / The Happiest Girl",
          type: "starchaser",
          weight: 0
        }
      ]
      },
      {
      text: "What is the true taste of NTU, in your opinion?",
      options: [
        { text: "Cai fan", type: "ddlfighter" },
        { text: "McDonald’s", type: "pypfinder" },
        { text: "My own creation", type: "pantryalchemist" },
        { text: "Monster Curry at Jurong Point", type: "ntuloster" }
      ]
      },
      {
      text: "It is a rest day. What is your move?",
      options: [
        { text: "A little escape to Johor Bahru", type: "ntuloster" },
        { text: "Disappear into my hall room and recharge in silence", type: "hallhermit" },
        { text: "Attempt a suspicious but ambitious cooking experiment", type: "pantryalchemist" },
        { text: "Go look for a part-time job because peace is expensive", type: "careerfairghost" }
      ]
      },
      {
      text: "You see AIA running another event. What is your reaction?",
      options: [
        {
          text: "Scan the area for prizes immediately",
          type: "eventnpc",
          weight: 2
        },
        {
          text: "Remember I have a due soon and silently migrate to LWN Library",
          type: "ddlfighter",
          weight: 2
        },
        {
          text: "Quietly leave before anyone tries to talk to me",
          type: "hallhermit",
          weight: 2
        },
        {
          text: "Complain internally: why is it always so loud?",
          type: "pypfinder",
          weight: 2
        }
      ]
      },
      {
      text: "For CC1, what are the weightages of the three assignments?",
      options: [
      { 
      text: "15% / 25% / 60%",
      type: "pypfinder",
      weight: 0
      },
      { 
      text: "20% / 25% / 40%",
      type: "pypfinder",
      weight: 2
      },
      { 
      text: "15% / 20% / 45%",
      type: "pypfinder",
      weight: 0
      },
      { 
      text: "20% / 30% / 40%",
      type: "pypfinder",
      weight: 0
      }
    ]
      },
      {
      text: "What is your favorite spot on NTU campus?",
      options: [
        { text: "My cozy room", type: "hallhermit" },
        { text: "The Wave", type: "waveresidence" },
        { text: "AIA Canopy", type: "eventnpc" },
        { text: "Yunnan Garden", type: "ntuloster" }
      ]
      },
      {
      text: "What can instantly bring you back to life?",
      options: [
        { text: "A career fair tomorrow", type: "careerfairghost" },
        { text: "event and free food", type: "eventnpc" },
        { text: "Concert tickets going on sale today", type: "starchaser" },
        { text: "8+1 tonight", type: "dormmixologist" }
      ]
      },
      {
      text: "You wake up and realize you are about to miss a CC class. What is your current mood?",
      options: [
        { text: "Roll over and get a second round of sleep", type: "hallhermit" },
        { text: "Email the prof immediately and apologize like a responsible academic citizen", type: "pypfinder" },
        { text: "Breakfast first. Crisis later", type: "pantryalchemist" },
        { text: "One game to calm down before facing reality", type: "esportsfanatic" }
      ]
    },
    {
      text: "When is the main pool’s weekly cleaning time?",
      options: [
        {
          text: "Thursday 2–5pm",
          type: "waveresidence",
          weight: 0
        },
        {
          text: "Tuesday 2–5pm",
          type: "waveresidence",
          weight: 0
        },
        {
          text: "Monday 2–5pm",
          type: "waveresidence",
          weight: 2
        },
        {
          text: "On the weekend",
          type: "waveresidence",
          weight: 0
        }
      ]
      },
      {
      text: "If a cocktail recipe has juice, egg white, or cream, what do you do?",
      options: [
        {
          text: "Shake it until the drink gets its dramatic soul foam",
          type: "dormmixologist",
          weight: 2
        },
        {
          text: "Stir it quietly like a mysterious bartender",
          type: "dormmixologist",
          weight: 0
        },
        {
          text: "Blend it and hope the machine understands the assignment",
          type: "pantryalchemist",
          weight: 1
        },
        {
          text: "Ice it aggressively and call it a day",
          type: "hallhermit",
          weight: 0
        }
      ]
      },
      {
      text: "In a group project, what is your usual state?",
      options: [
        { text: "Tired", type: "pypfinder" },
        { text: "Full of energy", type: "waveresidence" },
        { text: "In closed-door cultivation mode", type: "hallhermit" },
        { text: "Mentally already outside NTU", type: "ntuloster" }
      ]
      },
      {
      text: "Your crush likes everyone’s post except yours. What do you do?",
      options: [
        {
          text: "Overthink it deeply and enter emotional damage mode",
          type: "lovestruck",
          weight: 2
        },
        {
          text: "Start a game and pretend I absolutely do not care",
          type: "esportsfanatic",
          weight: 1
        },
        {
          text: "Drink away the heartbreak",
          type: "dormmixologist",
          weight: 2
        },
        {
          text: "Text them first and investigate the situation myself",
          type: "lovestruck",
          weight: 2
        }
      ]
    },
    {
    text: "What is your go-to drink at NTU?",
    options: [
      { 
      text: "Lemon Tea — simple, reliable, and emotionally supportive",
      type: "pantryalchemist",
      weight: 2
      },
      { 
      text: "Mixue — sweet enough to fix my day temporarily",
      type: "pantryalchemist",
      weight: 0
      },
      { 
      text: "Chagee — because I deserve a tiny luxury between classes",
      type: "hallhermit",
      weight: 1 
      },
      { 
      text: "Free drink — if it costs nothing, it tastes better",
      type: "eventnpc",
      weight: 1
      }
    ]
  },
    {
      text: "When are you most likely to post on Instgram?",
      options: [
        { text: "Gym day", type: "waveresidence" },
        { text: "Almost every day", type: "eventnpc" },
        { text: "The day before finals", type: "ddlfighter" },
        { text: "Valentine’s Day", type: "lovestruck" }
      ]
    },
    {
      text: "What do you usually do during recess week?",
      options: [
        { text: "Stay in bed for a full week-long system recovery", type: "hallhermit" },
        { text: "Keep training like the routine owns me", type: "waveresidence" },
        { text: "Take a spontaneous trip before reality respawns", type: "ntuloster" },
        { text: "Grind Honor of Kings for an entire week", type: "esportsfanatic" }
      ]
    },
    {
      text: "Which of these events would you be most interested in?",
      options: [
        {
          text: "Honor of Kings Challenger Cup Final",
          type: "esportsfanatic",
          weight: 2
        },
        {
          text: "an anime convention",
          type: "ntuloster",
          weight: 2
        },
        {
          text: "G.E.M. concert ticket release",
          type: "starchaser",
          weight: 2
        },
        {
          text: "Artificial Intelligence Tech Expo",
          type: "careerfairghost",
          weight: 2
        }
      ]
      },
      {
      text: "How long can you stay home without going out?",
      options: [
        { text: "I need to go out every day", type: "waveresidence" },
        { text: "Three days max", type: "pantryalchemist" },
        { text: "A week or more. Easily", type: "hallhermit" },
        { text: "As long as the Wi-Fi and games survive", type: "esportsfanatic" }
      ]
      },
      {
      text: "For hypertrophy training, how many reps per set is usually a good range?",
      options: [
        {
          text: "6–8 reps",
          type: "waveresidence",
          weight: 0
        },
        {
          text: "8–12 reps",
          type: "waveresidence",
          weight: 2
        },
        {
          text: "12–15 reps",
          type: "waveresidence",
          weight: 1
        },
        {
          text: "It depends on the person",
          type: "waveresidence",
          weight: 0
        }
      ]
      }, 
      {
      text: "There are only 6 hours left before the assignment deadline. What is your move?",
      options: [
        { text: "Professor GPT, please bless this submission", type: "ddlfighter" },
        { text: "Consider whether a Medical Certificate can save my timeline", type: "ddlfighter" },
        { text: "Wait for FGO this course", type: "hallhermit" },
        { text: "Drink first, process emotions later", type: "dormmixologist" }
      ]
    },
    {
      text: "What are you usually doing during NTU orientation?",
      options: [
        { text: "Honestly, I could be previewing the course materials right now", type: "pypfinder" },
        { text: "Locking myself in hall and avoiding all fresh human interaction", type: "hallhermit" },
        { text: "Singapore is too small. I am already checking flights out", type: "ntuloster" },
        { text: "Going full extrovert mode and adding everyone on Instagram", type: "eventnpc" }
      ]
    },
    {
      text: "If these four rebirth novels were in front of you, which one would you pick?",
      options: [
        { text: "Reborn One Hour Before DDL: I Unlock the Strongest AI", type: "ddlfighter" },
        { text: "Reborn with My Moving NTU Castle", type: "ntuloster" },
        { text: "Reborn: I Made a Million from Cai Fan", type: "esportsfanatic" },
        { text: "Reborn: The Entire School Falls in Love with Me", type: "lovestruck" }
      ]
      },
    ]
  }
};

// 初始化分数
function initScores() {
  scores = {};
  userAnswers = [];

  for (let type in personalities) {
    scores[type] = 0;
  }
}

// 点击中文/英文按钮后开始测试
function startQuiz(lang) {
  currentLang = lang;
  currentQuestionIndex = 0;
  initScores();

  trackEvent("start_quiz", {
    quiz_language: lang
  });
  
const heroCard = document.getElementById("hero-card");
if (heroCard) {
  heroCard.style.display = "none";
}

const mascotWrap = document.querySelector(".mascot-wrap");
if (mascotWrap) {
  mascotWrap.style.display = "none";
}

const busWrap = document.querySelector(".bus-wrap");
if (busWrap) {
  busWrap.style.display = "none";
}

const merchPreview = document.querySelector(".merch-preview");
if (merchPreview) {
  merchPreview.style.display = "none";
}

const stickers = document.querySelectorAll(".sticker");
stickers.forEach(function (sticker) {
  sticker.style.display = "none";
});

const resultContainer = document.getElementById("result-container");
  if (resultContainer) {
    resultContainer.style.display = "none";
  }

  const quizContainer = document.getElementById("quiz-container");
  if (quizContainer) {
    quizContainer.style.display = "block";
  }

  renderQuestion();
}

// 显示当前题目
function renderQuestion() {
  const question = quizData[currentLang].questions[currentQuestionIndex];

  const questionText = document.getElementById("question-text");
  const optionsContainer = document.getElementById("options-container");
  const progress = document.getElementById("quiz-progress");

  if (progress) {
    progress.textContent = `Question ${currentQuestionIndex + 1} / ${quizData[currentLang].questions.length}`;
  }

  questionText.textContent = question.text;
  optionsContainer.innerHTML = "";

  const savedAnswer = userAnswers[currentQuestionIndex];

  question.options.forEach(function (option, optionIndex) {
    const button = document.createElement("button");
    button.className = "option-btn";
    button.textContent = option.text;

    // 如果用户之前选过这一题，返回时高亮原来的选项
    if (savedAnswer && savedAnswer.optionIndex === optionIndex) {
      button.classList.add("selected");
    }

    // 点击选项，只记录答案，不直接加分
    button.onclick = function () {
      selectOption(optionIndex);
    };

    optionsContainer.appendChild(button);
  });

  // 底部导航按钮区域
  const navContainer = document.createElement("div");
  navContainer.className = "quiz-nav";

  const backButton = document.createElement("button");
  backButton.className = "back-btn";
  backButton.textContent = currentLang === "zh" ? "上一题" : "Previous";

  if (currentQuestionIndex === 0) {
    backButton.disabled = true;
  }

  backButton.onclick = function () {
    goBack();
  };

  navContainer.appendChild(backButton);
  optionsContainer.appendChild(navContainer);
}

function selectOption(optionIndex) {
  const question = quizData[currentLang].questions[currentQuestionIndex];
  const option = question.options[optionIndex];

  userAnswers[currentQuestionIndex] = {
    optionIndex: optionIndex,
    type: option.type,
    weight: option.weight ?? 1
  };

  currentQuestionIndex++;

  if (currentQuestionIndex < quizData[currentLang].questions.length) {
    renderQuestion();
  } else {
    showResult();
  }
}

function goBack() {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    renderQuestion();
  }
}
//计分函数
function calculateScoresFromAnswers() {
  scores = {};

  for (let type in personalities) {
    scores[type] = 0;
  }

  userAnswers.forEach(function (answer) {
    if (!answer) return;

    const fixedType = normalizeType(answer.type);
    const addScore = answer.weight ?? 1;

    if (!personalities[fixedType]) {
      return;
    }

    scores[fixedType] += addScore;
  });
}

//排序函数 
function getRankedResults() {
  return Object.keys(scores)
    .filter(function (type) {
      return personalities[type];
    })
    .map(function (type) {
      return {
        type: type,
        score: scores[type]
      };
    })
    .sort(function (a, b) {
      return b.score - a.score;
    });
}

function calculateMaxScores() {
  const maxScores = {};
  const questions = quizData[currentLang].questions;

  questions.forEach(function (question) {
    const questionMaxByType = {};

    question.options.forEach(function (option) {
      const fixedType = normalizeType(option.type);
      const optionWeight = option.weight ?? 1;

      if (!personalities[fixedType]) {
        return;
      }

      if (questionMaxByType[fixedType] === undefined) {
        questionMaxByType[fixedType] = optionWeight;
      } else {
        questionMaxByType[fixedType] = Math.max(
          questionMaxByType[fixedType],
          optionWeight
        );
      }
    });

    for (const type in questionMaxByType) {
      if (maxScores[type] === undefined) {
        maxScores[type] = 0;
      }

      maxScores[type] += questionMaxByType[type];
    }
  });

  return maxScores;
}

// 结果函数
function showResult() {
  calculateScoresFromAnswers();

  const rankedResults = getRankedResults();

  const finalType = rankedResults[0]?.type || "hallhermit";
  const result = personalities[finalType] || personalities.hallhermit;

  const content = result[currentLang] || result.zh;

const highestScore = rankedResults[0]?.score || 0;
const secondScore = rankedResults[1]?.score || 0;
const scoreGap = highestScore - secondScore;

// 娱乐人格测试匹配度：看第一名分数 + 第一名领先第二名多少
let matchPercent = 65
  + Math.min(highestScore, 12) * 1.8
  + Math.min(scoreGap, 6) * 2.2;

matchPercent = Math.round(matchPercent);

if (matchPercent > 98) {
  matchPercent = 98;
}

if (matchPercent < 68) {
  matchPercent = 68;
}

  const quizContainer = document.getElementById("quiz-container");
  const resultContainer = document.getElementById("result-container");

  if (!quizContainer || !resultContainer) {
    return;
  }

  quizContainer.style.display = "none";
  resultContainer.style.display = "block";

  const tagsHTML = (content.tags || [])
    .map(function (tag) {
      return `<span class="result-tag">${tag}</span>`;
    })
    .join("");

  const analysisHTML = content.analysis
    ? `
      <div class="result-section">
        <h3>${currentLang === "zh" ? "你的校园状态" : "Your Campus Mode"}</h3>
        <p>${content.analysis}</p>
      </div>
    `
    : "";

  const adviceHTML = content.advice
    ? `
      <div class="result-section">
        <h3>${currentLang === "zh" ? "校园生存建议" : "Campus Survival Advice"}</h3>
        <p>${content.advice}</p>
      </div>
    `
    : "";

  resultContainer.innerHTML = `
    <div class="result-card result-poster-card">
      <div class="result-badge">
        ${currentLang === "zh" ? "你的 NBTU 人格是..." : "Your NBTU Type is..."}
      </div>

      <img class="result-poster-img" src="${result.image}" alt="${result.name}">

      <h2 class="result-title">${result.name}</h2>

      <div class="match-box">
        <div class="match-label">
          ${currentLang === "zh" ? "人格匹配度" : "Personality Match"}
        </div>
        <div class="match-number">${matchPercent}%</div>
      </div>

      <div class="result-tags">
        ${tagsHTML}
      </div>

      ${analysisHTML}
      ${adviceHTML}

      <div class="result-actions">
        <button class="restart-btn" onclick="restartQuiz()">
          ${currentLang === "zh" ? "再测一次" : "Try Again"}
        </button>

        <button class="preview-card-btn" onclick="openMerchModal()">
          ${currentLang === "zh" ? "查看人物小卡" : "Preview Card"}
        </button>

        <button class="order-card-btn" onclick="openOrderForm()">
          ${currentLang === "zh" ? "订购人物小卡" : "Order Card"}
        </button>
      </div>
    </div>
  `;
}

function openTypesModal() {
  document.getElementById("typesModal").classList.add("show");
  closeMobileMenu();
}

function closeTypesModal() {
  document.getElementById("typesModal").classList.remove("show");
}

function openMerchModal() {
  document.getElementById("merchModal").classList.add("show");
  closeMobileMenu();
}

function closeMerchModal() {
  document.getElementById("merchModal").classList.remove("show");
}

function toggleMobileMenu() {
  const menu = document.getElementById("mobileMenu");
  menu.classList.toggle("show");
}

function closeMobileMenu() {
  const menu = document.getElementById("mobileMenu");
  menu.classList.remove("show");
}

// 点击弹窗背景关闭
window.addEventListener("click", function (event) {
  const typesModal = document.getElementById("typesModal");
  const merchModal = document.getElementById("merchModal");

  if (event.target === typesModal) {
    closeTypesModal();
  }

  if (event.target === merchModal) {
    closeMerchModal();
  }
});

function restartQuiz() {
  currentQuestionIndex = 0;
  initScores();

  const quizContainer = document.getElementById("quiz-container");
  if (quizContainer) {
    quizContainer.style.display = "none";
  }

  const resultContainer = document.getElementById("result-container");
  if (resultContainer) {
    resultContainer.style.display = "none";
  }

  const heroCard = document.getElementById("hero-card");
  if (heroCard) {
    heroCard.style.display = "";
  }

  const mascotWrap = document.querySelector(".mascot-wrap");
  if (mascotWrap) {
    mascotWrap.style.display = "";
  }

  const busWrap = document.querySelector(".bus-wrap");
  if (busWrap) {
    busWrap.style.display = "";
  }

  const merchPreview = document.querySelector(".merch-preview");
  if (merchPreview) {
    merchPreview.style.display = "";
  }

  const stickers = document.querySelectorAll(".sticker");
  stickers.forEach(function (sticker) {
    sticker.style.display = "";
  });

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

function openOrderForm() {
  if (!ORDER_FORM_URL || ORDER_FORM_URL.includes("这里换成")) {
    alert(currentLang === "zh" ? "请先填写 Microsoft Form 链接" : "Please add the Microsoft Form link first.");
    return;
  }

  window.open(ORDER_FORM_URL, "_blank");
}

// share按钮
const SITE_SHARE_URL = "https://in-dardside.github.io/NBTU-test/";

function shareSite() {
  const shareUrl = SITE_SHARE_URL;

  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(shareUrl)
      .then(function () {
        showShareToast(
          currentLang === "zh"
            ? "链接已复制！快去分享给朋友吧～"
            : "Link copied! Share it with your friends!"
        );
      })
      .catch(function () {
        fallbackCopyText(shareUrl);
      });
  } else {
    fallbackCopyText(shareUrl);
  }

  if (typeof closeMobileMenu === "function") {
    closeMobileMenu();
  }
}

function fallbackCopyText(text) {
  const tempInput = document.createElement("input");

  tempInput.value = text;
  tempInput.setAttribute("readonly", "");
  tempInput.style.position = "fixed";
  tempInput.style.left = "-9999px";
  tempInput.style.top = "-9999px";

  document.body.appendChild(tempInput);
  tempInput.select();
  tempInput.setSelectionRange(0, 99999);

  try {
    document.execCommand("copy");
    showShareToast(
      currentLang === "zh"
        ? "链接已复制！快去分享给朋友吧～"
        : "Link copied! Share it with your friends!"
    );
  } catch (error) {
    showShareToast(
      currentLang === "zh"
        ? "复制失败，请手动复制网址"
        : "Copy failed. Please copy the link manually."
    );
  }

  document.body.removeChild(tempInput);
}

function showShareToast(message) {
  let toast = document.getElementById("share-toast");

  if (!toast) {
    toast = document.createElement("div");
    toast.id = "share-toast";
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(function () {
    toast.classList.remove("show");
  }, 2200);
}