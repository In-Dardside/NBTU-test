let currentLang = "zh";
let currentQuestionIndex = 0;
let scores = {};
let userAnswers = [];
const ORDER_FORM_URL = "https://tally.so/r/PdyW4b"
//12种人格资料
const personalities = {
  pypfinder: {
  name: "PYP Finder",
  image: "宣传海报/pyp-finder.jpg",

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
    image: "宣传海报/Due-fighter.jpg",

    zh: {
      title: "传说中的 PYP 战神",
      description: "考试前永远比老师更懂题型，PYP、答案、考点全都在你的掌控范围内。",
      tags: ["高效复习", "考前清醒", "资料收集王"]
    },

    en: {
      title: "Always Racing Against the Deadline",
      description: "You are either rushing a deadline, or rushing to start rushing a deadline.",
      tags: ["Deadline Mode", "Keyboard Warrior", "Pressure Powered"]
    }
  },

  careerfairghost: {
    name: "Career Fair Ghost",
    image: "宣传海报/career fair ghost.jpg",

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
    image: "宣传海报/wave-residence.jpg",

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
    image: "宣传海报/lovestruck.jpg",

    zh: {
      title: "恋爱脑小狮子",
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
    image: "宣传海报/star chaser.jpg",

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
    image: "宣传海报/E-sports Fanatic.jpg",

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
    image: "宣传海报/Pantry-Alchemist.jpg",

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
    image: "宣传海报/hallhermit.jpg",

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
    image: "宣传海报/event-npc.jpg",

    zh: {
      title: "校园活动固定刷新点",
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
    image: "宣传海报/ntu-loster.jpg",
    
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
    image: "宣传海报/酒鬼.jpg",

     zh: {
      title: "宿舍微醺调饮师",
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
          { text: "直到DDL提醒再打开", type: "ddlfighter" },
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
        weight: 3
        },
        {
        text: "兰陵王",
        type: "esportsfanatic",
        weight: 2
        }, 
        {
        text: "空ban位",
        type: "esportsfanatic",
        weight: 1
        },       
      ]
      },
      {
        text: "DDL 前一晚，你的真实状态是？",
        options: [
          { text: "已经提前交了，甚至还检查了格式", type: "pypfinder" },
          { text: "正在疯狂赶工，键盘像打鼓", type: "ddlfighter" },
          { text: "打开文档写标题，然后继续休息", type: "hallhermit" },
          { text: "开把游戏再说，我相信压力会自己消失", type: "esportsfanatic" }
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
          weight: 3
          },
          {
          text: "Vodka / Orange Juice / Sprite",
          type: "dormmixologist",
          weight: 1
          },
          {
          text: "Whisky / Coke / Lemon Tea",
          type: "dormmixologist",
          weight: 1
          },
          {
          text: "Milk / Coffee / Ice",
          type: "pantryalchemist",
          weight: 1
          }
  ]
},
      {
        text: "如果你喜欢的女生约你吃饭，和朋友开黑，参加event和兼职赚钱哪一项对你来说最重要？",
        options: [
          { text: "出去吃饭", type: "lovestruck" },
          { text: "开黑", type: "esportsfanatic" },
          { text: "参加event", type: "eventnpc" },
          { text: "兼职赚钱", type: "careerfairghost" }
        ]
      },
      {
        text: "BLACKPINK 的 EP《DEADLINE》包含以下哪一组歌曲？",
        options: [
        {
        text: "JUMP / GO / Me and my / Champion / Fxxxboy",
        type: "starChaser",
        weight: 3
        },
        {
        text: "Pink Venom / GO / Me and my / Fxxxboy / The Happiest Girl",
        type: "starChaser",
        weight: 1
        },
        {
        text: "JUMP / GO / Me and my / Forever Young / Fxxxboy / The Happiest Girl",
        type: "starChaser",
        weight: 1
        },
        {
        text: "Pink Venom / Champion / Forever Young / Fxxxboy / The Happiest Girl",
        type: "starChaser",
        weight: 1
        },
        ]
      },
      {
        text: "你认为NTU最美味的食物是？",
        options: [
          { text: "I don't know", type: "hallhermit" },
          { text: "麦当劳", type: "pypfinder" },
          { text: "自己做的黑暗料理", type: "pantryalchemist" },
          { text: "JP的Monster Curry", type: "ntuloster" }
        ]
      },
      {
        text: "如果今天是休息日，你会做什么？",
        options: [
          { text: "去JB度假", type: "ntuloster" },
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
          weight: 1
          },
          { 
          text: "走向LWN Library", 
          type: "pypfinder", 
          weight: 1
          },
          { 
          text: "默默走开",
          type: "hallhermit",
          weight: 1
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
          text: "15%/25%/60%",
          type: "pypfinder",
          weight: 1
          },
          { 
          text: "20%/25%/40%", 
          type: "pypfinder", 
          weight: 3
          },
          { 
          text: "15%/20%/45%",
          type: "pypfinder",
          weight: 1
          },
          { 
          text: "20%/30%/40%", 
          type: "pypfinder",
          weight: 1
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
          { text: "兄弟，上号", type: "esportsfanatic" },
          { text: "今天演唱会门票预售", type: "starchaser" },
          { text: "今天晚上喝8+1", type: "dormmixologist" }
        ]
      },
      {
        text: "早晨醒来，你发现自己即将错过CC课，你此刻的心情是:",
        options: [
          { text: "翻个身，再睡个回笼觉", type: "hallhermit" },
          { text: "懊悔自己荒废了一节课，怒刷两套PYP", type: "pypfinder" },
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
          weight: 1
          },
          { 
          text: "Monday 2-5pm",
          type: "waveresidence",
          weight: 3
          },
          {
          text: "Monday 2-5pm", 
          type: "waveresidence",
          weight: 1
          },
          { 
          text: "On the weekend", 
          type: "waveresidence",
          weight: 1
          }
        ]
      },
      {
      text: "如果调酒时配方里有果汁、蛋清或奶油，你会怎么处理？",
      options: [
      { 
      text: "Shake it：直接摇到杯子里出现灵魂泡沫",
      type: "dormmixologist",
      weight: 3
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
      weight: 1
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
        text: "如果心中的“她”在点赞时跳过了你的朋友圈，你会？",
        options: [
          { 
          text: "仔细思考，陷入内耗之中",
          type: "lovestruck",
          weight: 3
          },
          { 
          text: "正在打游戏的你并没有注意到",
          type: "esportsfanatic",
          weight: 1
          },
          { 
          text: "借酒消愁", 
          type: "pantryalchemist",
          weight: 2
          },
          { 
          text: "主动找“她”聊天，试图一探究竟", 
          type: "lovestruck",
          weight: 3
          }
        ]
      }, 
      {
        text: "在游戏“三角洲行动”中，请问你通常在开出价值多少的物资后会选择撤离？",
        options: [
          { 
          text: "30w-50w，见好就收", 
          type: "esportsfanatic",
          weight: 1
          },
          { 
          text: "只要听到有脚步声就准备撤离",
          type: "esportsfanatic",
          weight: 0
          },
          { 
          text: "直到摸出非洲之心", 
          type: "esportsfanatic",
          weight:3
          },
          { 
          text: "死战不退，直到撤离失败才留下悔恨的眼泪", 
          type: "esportsfanatic", 
          weight: 2
          }
        ]
      },
      {
        text: "你最近一次在NTU做的食物是什么？",
        options: [
          { 
          text: "方便面", 
          type: "hallhermit",
          weight: 1
          },
          { 
          text: "火锅",
          type: "esportsfanatic" ,
          weight: 1
          },
          { 
          text: "四菜一汤",
          type: "waveresidence",
          weight: 2
          },
          { 
          text: "满汉全席", 
          type: "pantryalchemist",
          weight:3 
          }
        ]
      },      
      {
        text: "请问以下四项活动中，你最感兴趣是哪一项",
        options: [
          { 
          text: "王者荣耀挑战者杯总决赛", 
          type: "esportsfanatic",
          weight: 1
          },
          { 
          text: "CCG EXPO 2026",
          type: "ntuloster",
          weight: 1 
          },
          { 
          text: "邓紫棋演唱会开票",
          type: "starchaser",
          weight: 3
          },
          {
          text: "人工智能科技博览会",
          type: "pypfinder",
          weight: 2 
          }
        ]
      },
      {
        text: "你最长可以在家宅多久？",
        options: [
          { text: "每天都要出门锻炼", type: "waveresidence" },
          { text: "3天以内", type: "pantryalchemist" },
          { text: "想多久就多久", type: "esportsfanatic" },
          { text: "一周以上", type: "hallhermit" }
        ]
      },
      {
        text: "无氧器械训练中，如果你的目标是增肌，请问一组多少次比较合理？",
        options: [
          { 
          text: "6-8次",
          type: "waveresidence",
          weight: 1
          },
          { 
          text: "8-12次",
          type: "waveresidence",
          weight :3
          },
          { 
          text: "12-15次",
          type: "waveresidence", 
          weight: 1  
          },
          { 
            text: "练到力竭", 
            type: "waveresidence",
            weight :0
          }
        ]
      },
      {
        text: "recess week 你通常做什么？",
        options: [
          { text: "在床上躺一周", type: "hallhermit" },
          { text: "按规律健身", type: "waveresidence" },
          { text: "来一场说走就走的旅行", type: "ntuloster" },
          { text: "一周打上王者", type: "esportsfanatic" }
        ]
      },
    ]
  },

  en: {
    questions: [
      {
      text: "If NTU were a game, what would your main quest be?",
      options: [
        { text: "Find Past year Papers and speedrun the highest GPA possible.", type: "pypfinder" },
        { text: "The world is huge, and I need to see it.", type: "ntuloster" },
        { text: "Hide in hall, avoid unnecessary social damage.", type: "hallhermit" },
        { text: "Spawn at every event and hunt for free food.", type: "eventnpc" }
      ]
      },
      {
      text: "When you see an email titled “Important Reminder”, what is your first reaction?",
      options: [
        { text: "Open it only when the DDL starts screaming at me.", type: "ddlfighter" },
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
          weight: 3
        },
        {
          text: "Prince of Lanling",
          type: "esportsfanatic",
          weight: 2
        },
        {
          text: "Empty ban slot",
          type: "esportsfanatic",
          weight: 1
        }
      ]
      },
      {
      text: "The night before a DDL, what is your real status?",
      options: [
        { text: "Already submitted, and even checked the formatting.", type: "pypfinder" },
        { text: "Typing like my keyboard is doing a drum solo.", type: "ddlfighter" },
        { text: "Open the document, type the title, then continue resting.", type: "hallhermit" },
        { text: "One game first. I believe pressure will disappear by itself.", type: "esportsfanatic" }
      ]
      },
      {
      text: "If your laptop suddenly black-screens, what do you do?",
      options: [
        { text: "Start scrolling on my phone.", type: "hallhermit" },
        { text: "Angry with the PYP I just finished writing.", type: "pypfinder" },
        { text: "Keep watching my idol’s live stage. The world can end after this performance.", type: "starchaser" },
        { text: "My million-dollar extraction???", type: "esportsfanatic" }
      ]
    },
    {
      text: "Your crush asks you out for dinner, your friend asks you to game, there is an event, and a part-time shift pays cash. Which one matters most?",
      options: [
        { text: "Dinner with my crush.", type: "lovestruck" },
        { text: "Queueing up with the boys.", type: "esportsfanatic" },
        { text: "Going to the event.", type: "eventnpc" },
        { text: "Taking the paid shift.", type: "careerfairghost" }
      ]
    },
    {
      text: "Which set of songs is included in BLACKPINK’s EP DEADLINE?",
      options: [
        {
          text: "JUMP / GO / Me and my / Champion / Fxxxboy",
          type: "starchaser",
          weight: 3
        },
        {
          text: "Pink Venom / GO / Me and my / Fxxxboy / The Happiest Girl",
          type: "starchaser",
          weight: 1
        },
        {
          text: "JUMP / GO / Me and my / Forever Young / Fxxxboy / The Happiest Girl",
          type: "starchaser",
          weight: 1
        },
        {
          text: "Pink Venom / Champion / Forever Young / Fxxxboy / The Happiest Girl",
          type: "starchaser",
          weight: 1
        }
      ]
      },
      {
      text: "What do you think is the best food in NTU?",
      options: [
        { text: "I don’t know.", type: "hallhermit" },
        { text: "McDonald’s.", type: "pypfinder" },
        { text: "My own cuisine.", type: "pantryalchemist" },
        { text: "restaurant at jurong Point.", type: "ntuloster" }
      ]
      },
      {
      text: "If today is a rest day, what would you do?",
      options: [
        { text: "Take a mini vacation to JB.", type: "ntuloster" },
        { text: "Hide in hall.", type: "hallhermit" },
        { text: "Attempt some dark cuisine.", type: "pantryalchemist" },
        { text: "Go look for a part-time job.", type: "careerfairghost" }
      ]
      },
      {
      text: "When you see AIA running another event, what is your reaction?",
      options: [
        {
          text: "Look for prizes.",
          type: "eventnpc",
          weight: 1
        },
        {
          text: "Walk straight to LWN Library.",
          type: "pypfinder",
          weight: 1
        },
        {
          text: "Quietly walk away.",
          type: "hallhermit",
          weight: 1
        },
        {
          text: "Complain internally: why is it so loud?",
          type: "pypfinder",
          weight: 2
        }
      ]
      },
      {
      text: "For CC1, what are the weightages of Assignment 1, 2, and 3?",
      options: [
        {
          text: "15% / 25% / 60%",
          type: "pypfinder",
          weight: 1
        },
        {
          text: "20% / 25% / 40%",
          type: "pypfinder",
          weight: 3
        },
        {
          text: "15% / 20% / 45%",
          type: "pypfinder",
          weight: 1
        },
        {
          text: "20% / 30% / 40%",
          type: "pypfinder",
          weight: 1
        }
      ]
      },
      {
      text: "What is your favorite place on NTU campus?",
      options: [
        { text: "My cozy room.", type: "hallhermit" },
        { text: "The Wave.", type: "waveresidence" },
        { text: "AIA Canopy.", type: "eventnpc" },
        { text: "Yunnan Garden.", type: "ntuloster" }
      ]
      },
      {
      text: "What makes you suddenly feel alive?",
      options: [
        { text: "There is a career fair tomorrow.", type: "careerfairghost" },
        { text: "Bro, queue up.", type: "esportsfanatic" },
        { text: "Concert ticket presale starts today.", type: "starchaser" },
        { text: "8+1 tonight.", type: "dormmixologist" }
      ]
      },
      {
      text: "You wake up and realize you are about to miss your CC class. What is your current mood?",
      options: [
        { text: "Roll over and get some extra sleep.", type: "hallhermit" },
        { text: "Regret wasting one class and angrily grind two sets of PYP.", type: "pypfinder" },
        { text: "Time for breakfast.", type: "pantryalchemist" },
        { text: "One game to calm myself down.", type: "esportsfanatic" }
      ]
      }
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
const maxScores = calculateMaxScores();
const finalMaxScore = maxScores[finalType] || 1;

let matchPercent = Math.round((highestScore / finalMaxScore) * 100);

if (matchPercent > 100) {
  matchPercent = 100;
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