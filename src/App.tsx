import { useEffect, useState, useRef } from 'react';
import { Box, Typography, Avatar, Button, Chip, IconButton } from '@mui/joy';
import SendIcon from '@mui/icons-material/Send';
import CodeIcon from '@mui/icons-material/Code';
import BrushIcon from '@mui/icons-material/Brush';
import SpeedIcon from '@mui/icons-material/Speed';
import CloseIcon from '@mui/icons-material/Close';
import ArticleIcon from '@mui/icons-material/Article';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import avatar from './assets/avatar.jpg'; // Ensure you have an avatar image in this path

const initialMessages = [
  { from: 'carl', text: "Hey, I'm Carl 👋", delay: 1000 },
  { from: 'carl', text: "I'm a software developer from the UK, actively seeking out new opportunities.", delay: 1500 },
  { from: 'user', text: 'Hey Carl, what do you specialize in?', delay: 2000 },
  { from: 'carl', text: 'I specialize in:', delay: 1000 },
  { 
    from: 'carl', 
    text: 'React, TypeScript, and modern CSS', 
    type: 'skill-bubble',
    skills: ['React', 'Vue', 'Angular', 'TypeScript', 'Storybook', 'SCSS', 'Component Architecture', 'Responsive Design', 'Mobile first design'],
    delay: 1800 
  },
  { from: 'carl', text: 'I love building component systems that scale and delight users.', delay: 1700 },
  { from: 'user', text: 'That sounds great! What kind of projects have you worked on?', delay: 1500 },
  { from: 'carl', text: "I've built hundreds of complex forms and care about user experience. Each project taught me something new about performance, accessibility, and user experience.", delay: 2000 },
  { from: 'carl', text: "Most recently though, I've been working at Etch as a front-end developer, building and maintaing several component libraries and turning Figma prototypes into fully realised journeys.", delay: 2400 },
];

const articles = [
  {
    title: "What if components stopped pretending they were universal?",
    description: "The illusion of the universal component, my hot take on the future of component libraries.",
    date: "March 2024",
    readTime: "8 min read",
    link: "#"
  },
  {
    title: "What Makes Code Maintainable",
    description: "Maintainability in UI Design Systems: Scale vs. Opinionation",
    date: "October 2023",
    readTime: "6 min read",
    link: "#"
  },
  {
    title: "Codepen Tetris demo",
    description: "Fun challenge to build playable tetris inside codpen.",
    date: "December 2023",
    readTime: "",
    link: "https://codepen.io/carl-j-m/pen/VYZxpWW"
  },
  {
    title: "Codepen physics demo",
    description: "Another game experiment, this time with physics.",
    date: "January 2024",
    readTime: "",
    link: "https://codepen.io/carl-j-m/pen/MYgVzKG"
  }
];

const quickActions = [
  { label: 'View Projects', icon: <CodeIcon />, id: 'projects' },
  { label: 'Skills', icon: <BrushIcon />, id: 'skills' },
  { label: 'Work Experience', icon: <SpeedIcon />, id: 'experience' },
];

function App() {
  const [visibleMessages, setVisibleMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(true);
  const [showProjects, setShowProjects] = useState(false);
  const [showSkills, setShowSkills] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [visibleMessages]);

  useEffect(() => {
    const timeoutIds = [];
    let cumulativeDelay = 0;

    initialMessages.forEach((message, index) => {
      cumulativeDelay += message.delay;
      
      // Show typing indicator before Carl's messages
      if (message.from === 'carl' && index > 0) {
        const typingTimeoutId = setTimeout(() => {
          setIsTyping(true);
        }, cumulativeDelay - 500);
        timeoutIds.push(typingTimeoutId);
      }

      // Show the actual message
      const messageTimeoutId = setTimeout(() => {
        setIsTyping(false);
        setVisibleMessages((msgs) => [...msgs, message]);
        
        // Show quick actions after all messages
        if (index === initialMessages.length - 1) {
          setTimeout(() => setShowQuickActions(true), 500);
        }
      }, cumulativeDelay);
      
      timeoutIds.push(messageTimeoutId);
    });

    return () => {
      timeoutIds.forEach(id => clearTimeout(id));
    };
  }, []);

  const handleActionClick = (actionId) => {
    if (actionId === 'projects') {
      setShowProjects(true);
    }
    if (actionId === 'skills') {
      setShowSkills(true);
    }
    // Handle other actions here
  };

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 400,
        height: '90vh',
        maxHeight: 700,
        bgcolor: 'background.surface',
        borderRadius: 'xl',
        boxShadow: 'xl',
        overflow: 'hidden',
        mx: 'auto',
        my: 3,
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid',
        borderColor: 'divider',
        position: 'relative',
      }}
    >
      {/* Projects Overlay */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          bgcolor: 'background.surface',
          zIndex: 10,
          transform: showProjects ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.3s ease-in-out',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 'xl',
        }}
      >
        {/* Projects Header */}
        <Box
          sx={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            py: 2,
            px: 2.5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: 'sm',
          }}
        >
          <Typography level="title-lg" sx={{ color: 'white', fontWeight: 600 }}>
            My Articles & Demos
          </Typography>
          <IconButton
            variant="plain"
            color="neutral"
            onClick={() => setShowProjects(false)}
            sx={{
              color: 'white',
              '&:hover': {
                bgcolor: 'rgba(255,255,255,0.1)',
              },
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Articles List */}
        <Box
          sx={{
            flex: 1,
            overflowY: 'auto',
            px: 2,
            py: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            bgcolor: 'background.level1',
            '&::-webkit-scrollbar': {
              width: '6px',
            },
            '&::-webkit-scrollbar-track': {
              bgcolor: 'transparent',
            },
            '&::-webkit-scrollbar-thumb': {
              bgcolor: 'neutral.300',
              borderRadius: '3px',
            },
          }}
        >
          {articles.map((article, idx) => (
            <Box
              key={idx}
              sx={{
                bgcolor: 'background.surface',
                borderRadius: 'lg',
                p: 2.5,
                boxShadow: 'sm',
                border: '1px solid',
                borderColor: 'divider',
                cursor: 'pointer',
                transition: 'all 0.2s',
                '&:hover': {
                  boxShadow: 'md',
                  borderColor: 'primary.300',
                  transform: 'translateY(-2px)',
                },
              }}
            >
                              <a href={article.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>

                <ArticleIcon 
                  sx={{ 
                    color: 'primary.500',
                    fontSize: 24,
                    mt: 0.5,
                  }} 
                />
     
                <Box sx={{ flex: 1 }}>
                  <Typography level="title-md" sx={{ mb: 0.5 }}>
                    {article.title}
                  </Typography>
                  <Typography level="body-sm" sx={{ color: 'text.secondary', mb: 1 }}>
                    {article.description}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Typography level="body-xs" sx={{ color: 'text.tertiary' }}>
                      {article.date}
                    </Typography>
                    <Typography level="body-xs" sx={{ color: 'text.tertiary' }}>
                      {article.readTime}
                    </Typography>
                  </Box>
                </Box>
                
                <OpenInNewIcon 
                  sx={{ 
                    fontSize: 16, 
                    color: 'text.tertiary',
                    mt: 0.5,
                  }} 
                />
              </Box>
              </a>
            </Box>
          ))}
        </Box>
      </Box>
      {/* Skills Overlay */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          bgcolor: 'background.surface',
          zIndex: 10,
          transform: showSkills ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.3s ease-in-out',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 'xl',
        }}
      >
        {/* Skills Header */}
        <Box

          sx={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            py: 2,
            px: 2.5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: 'sm',
          }}
        >
          <Typography level="title-lg" sx={{ color: 'white', fontWeight: 600 }}>
            Skills 
          </Typography>
          <IconButton

            variant="plain"
            color="neutral"
            onClick={() => setShowSkills(false)}
            sx={{
              color: 'white',
              '&:hover': {
                bgcolor: 'rgba(255,255,255,0.1)',
              },
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>      
        {/* Skills List */}
        <Box
          sx={{
            flex: 1,
            overflowY: 'auto',
            px: 2,
            py: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: 1.5,
            bgcolor: 'background.level1',
            '&::-webkit-scrollbar': {
              width: '6px',
            },
            '&::-webkit-scrollbar-track': {
              bgcolor: 'transparent',
            },
            '&::-webkit-scrollbar-thumb': {
              bgcolor: 'neutral.300',
              borderRadius: '3px',
            },
          }}
        >
          <Typography level="title-md" sx={{ color: 'black', fontWeight: 600 }}>
            Technical
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 1,
              px: 2,
              py: 1.5,
            }}
          >

            {['React', 'Vue', 'Angular', 'TypeScript', 'Storybook', 'SCSS', 'Component Architecture', 'Responsive Design', 'Mobile first design'].map((skill, idx) => (
              <Chip
                key={idx}
                size="sm"
                variant="soft"
                color="primary"
                sx={{
                  fontWeight: 500,
                  borderRadius: 'sm',
                }}
              >
                {skill}
              </Chip>
            ))}
          </Box>
          <Typography level="title-md" sx={{ color: 'black', fontWeight: 600 }}>
            Soft
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 1,
              px: 2,
              py: 1.5,
            }}
          >

            {['Lifelong learner', 'Systems thinker', 'Writing', 'Listening'].map((skill, idx) => (
              <Chip
                key={idx}
                size="sm"
                variant="soft"
                color="primary"
                sx={{
                  fontWeight: 500,
                  borderRadius: 'sm',
                }}
              >
                {skill}
              </Chip>
            ))}
          </Box>
        </Box>
      </Box>


      {/* Main Chat Interface */}
      {/* Header */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          py: 2,
          px: 2.5,
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          boxShadow: 'sm',
        }}
      >
        <Box sx={{ position: 'relative' }}>
          <Avatar 
            alt='Carl Mensah'
            src={avatar}
          >
            C
          </Avatar>
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              width: 12,
              height: 12,
              bgcolor: '#4caf50',
              borderRadius: '50%',
              border: '2px solid white',
            }}
          />
        </Box>
        <Box>
          <Typography level="title-md" sx={{ color: 'white', fontWeight: 600 }}>
            Carl Mensah
          </Typography>
          <Typography level="body-xs" sx={{ color: 'rgba(255,255,255,0.8)' }}>
            Frontend Developer • Available
          </Typography>
        </Box>
      </Box>

      {/* Messages Area */}
      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          px: 2,
          py: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 1.5,
          bgcolor: 'background.level1',
          '&::-webkit-scrollbar': {
            width: '6px',
          },
          '&::-webkit-scrollbar-track': {
            bgcolor: 'transparent',
          },
          '&::-webkit-scrollbar-thumb': {
            bgcolor: 'neutral.300',
            borderRadius: '3px',
          },
        }}
      >
        {visibleMessages.map((msg, i) => (
          <Box
            key={i}
            sx={{
              display: 'flex',
              justifyContent: msg.from === 'user' ? 'flex-end' : 'flex-start',
              animation: 'slideIn 0.3s ease-out',
              '@keyframes slideIn': {
                from: {
                  opacity: 0,
                  transform: 'translateY(10px)',
                },
                to: {
                  opacity: 1,
                  transform: 'translateY(0)',
                },
              },
            }}
          >
            {msg.type === 'skill-bubble' ? (
              <Box
                sx={{
                  maxWidth: '85%',
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 0.8,
                  px: 2,
                  py: 1,
                  borderRadius: '16px',
                  bgcolor: 'primary.50',
                }}
              >
                {msg.skills.map((skill, idx) => (
                  <Chip
                    key={idx}
                    size="sm"
                    variant="soft"
                    color="primary"
                    sx={{
                      fontWeight: 500,
                      borderRadius: 'sm',
                    }}
                  >
                    {skill}
                  </Chip>
                ))}
              </Box>
            ) : (
              <Box
                sx={{
                  maxWidth: '75%',
                  px: 2.5,
                  py: 1.5,
                  borderRadius: msg.from === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                  bgcolor: msg.from === 'user' ? 'primary.500' : 'background.surface',
                  color: msg.from === 'user' ? 'white' : 'text.primary',
                  boxShadow: 'sm',
                  border: msg.from === 'carl' ? '1px solid' : 'none',
                  borderColor: 'divider',
                }}
              >
                <Typography 
                  level="body-sm" 
                  sx={{ 
                    lineHeight: 1.5,
                    color: msg.from === 'user' ? 'white' : 'text.primary',
                  }}
                >
                  {msg.text}
                </Typography>
              </Box>
            )}
          </Box>
        ))}
        
        {isTyping && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              px: 2.5,
              py: 1.5,
              bgcolor: 'background.surface',
              borderRadius: '18px 18px 18px 4px',
              width: 'fit-content',
              boxShadow: 'sm',
              border: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Box sx={{ display: 'flex', gap: 0.3 }}>
              {[0, 1, 2].map((i) => (
                <Box
                  key={i}
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    bgcolor: 'neutral.400',
                    animation: `typing 1.4s ease-in-out ${i * 0.2}s infinite`,
                    '@keyframes typing': {
                      '0%, 60%, 100%': {
                        transform: 'translateY(0)',
                        opacity: 0.7,
                      },
                      '30%': {
                        transform: 'translateY(-10px)',
                        opacity: 1,
                      },
                    },
                  }}
                />
              ))}
            </Box>
          </Box>
        )}
        <div ref={messagesEndRef} />
      </Box>

      {/* Quick Actions */}
      {showQuickActions && (
        <Box
          sx={{
            px: 2,
            py: 1.5,
            borderTop: '1px solid',
            borderColor: 'divider',
            bgcolor: 'background.surface',
            display: 'flex',
            gap: 1,
            overflowX: 'auto',
            '&::-webkit-scrollbar': { display: 'none' },
            animation: 'fadeIn 0.5s ease-out',
            '@keyframes fadeIn': {
              from: { opacity: 0 },
              to: { opacity: 1 },
            },
          }}
        >
          {quickActions.map((action, idx) => (
            <Button
              key={idx}
              variant="outlined"
              size="sm"
              startDecorator={action.icon}
              onClick={() => handleActionClick(action.id)}
              sx={{
                borderRadius: 'xl',
                whiteSpace: 'nowrap',
                fontSize: 'xs',
                py: 0.5,
                px: 2,
                minHeight: 32,
                '&:hover': {
                  bgcolor: 'primary.50',
                  borderColor: 'primary.300',
                },
              }}
            >
              {action.label}
            </Button>
          ))}
        </Box>
      )}

      {/* Input Area */}
      <Box
        sx={{
          px: 2,
          py: 2,
          borderTop: '1px solid',
          borderColor: 'divider',
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          bgcolor: 'background.surface',
        }}
      >
        <Box
          sx={{
            flex: 1,
            bgcolor: 'background.level1',
            borderRadius: 'xl',
            px: 2.5,
            py: 1.5,
            border: '1px solid',
            borderColor: 'divider',
            display: 'flex',
            alignItems: 'center',
            transition: 'all 0.2s',
            '&:hover': {
              borderColor: 'primary.300',
              bgcolor: 'background.surface',
            },
          }}
        >
          <Typography 
            level="body-sm" 
            sx={{ 
              color: 'text.tertiary',
              fontWeight: 400,
            }}
          >
           Email Carl
          </Typography>
        </Box>
        <Button 
          variant="solid" 
          color="primary"
          size="md"
          sx={{
            borderRadius: '50%',
            minWidth: 44,
            height: 44,
            p: 0,
            boxShadow: 'sm',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            '&:hover': {
              transform: 'scale(1.05)',
              boxShadow: 'md',
            },
            transition: 'all 0.2s',
          }}
        >
          <SendIcon sx={{ fontSize: 20 }} />
        </Button>
      </Box>
    </Box>
  );
}

export default App;