import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

/**
 * Tipos básicos
 */
export type Status = 'active' | 'inactive' | 'blocked';
export type QuestionStatus = 'draft' | 'published' | 'archived';

/**
 * Interface de perfil de usuário (profiles)
 */
export interface IProfile {
  id: string;
  email?: string;
  user_name?: string | null;
  full_name?: string | null;
  avatar_url?: string | null;
  bio?: string | null;
  origem?: string | null;
  current_in?: string | null;
  status?: Status;
  created_at?: string;
  updated_at?: string;
}

/**
 * Interface de temas (themes)
 */
export interface ITheme {
  id: string;
  name: string;
  created_at: string;
}

/**
 * Interface de países (countries)
 */
export interface ICountry {
  id: string;
  name: string;
  code: string;
  created_at: string;
}

/**
 * Interfaces para Dicas (tips)
 */
export interface ITipBase {
  id: string;
  title: string;
  content: string;
  created_by: string;
  theme_id: string | null;
  country_id: string | null;
  likes_count: number;
  created_at: string;
  updated_at: string;
}

export interface ITip extends ITipBase {
  profile?: Pick<IProfile, 'id' | 'user_name' | 'avatar_url'>;
  theme?: Pick<ITheme, 'id' | 'name'>;
  country?: Pick<ICountry, 'id' | 'name' | 'code'>;
}

/**
 * Interfaces para Comentários de Dicas (tips_comments)
 */
export interface ITipCommentBase {
  id: string;
  tip_id: string;
  user_id: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export interface ITipComment extends ITipCommentBase {
  profile?: Pick<IProfile, 'id' | 'user_name' | 'avatar_url'>;
}

/**
 * Interfaces para Likes de Dicas (tips_likes)
 */
export interface ITipLikeBase {
  id: string;
  tip_id: string;
  user_id: string;
  created_at: string;
}

export interface ITipLike extends ITipLikeBase {
  profile?: Pick<IProfile, 'id' | 'user_name' | 'avatar_url'>;
}

/**
 * Interfaces para Perguntas (questions)
 */
export interface IQuestionBase {
  id: string;
  title: string;
  content: string;
  created_by: string;
  theme_id: string | null;
  country_id: string | null;
  status: QuestionStatus;
  likes_count: number;
  views_count: number;
  created_at: string;
  updated_at: string;
}

export interface IQuestion extends IQuestionBase {
  profile?: Pick<IProfile, 'id' | 'user_name' | 'avatar_url'>;
  theme?: Pick<ITheme, 'id' | 'name'>;
  country?: Pick<ICountry, 'id' | 'name' | 'code'>;
}

/**
 * Interfaces para Comentários de Perguntas (questions_comments)
 */
export interface IQuestionCommentBase {
  id: string;
  question_id: string;
  user_id: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export interface IQuestionComment extends IQuestionCommentBase {
  profile?: Pick<IProfile, 'id' | 'user_name' | 'avatar_url'>;
}

/**
 * Interfaces para Likes de Perguntas (questions_likes)
 */
export interface IQuestionLikeBase {
  id: string;
  question_id: string;
  user_id: string;
  created_at: string;
}

export interface IQuestionLike extends IQuestionLikeBase {
  profile?: Pick<IProfile, 'id' | 'user_name' | 'avatar_url'>;
}

/**
 * Interfaces para formulários
 */
export interface ProfileFormData {
  user_name: string;
  full_name: string;
  bio?: string;
  origem?: string;
  current_in?: string;
}

export interface TipFormData {
  title: string;
  content: string;
  theme_id?: string;
  country_id?: string;
}

export interface QuestionFormData {
  title: string;
  content: string;
  theme_id?: string;
  country_id?: string;
  status: QuestionStatus;
}

export interface CommentFormData {
  content: string;
} 

interface ITipFull{
    id: string;
    title: string;
    content: string;
    created_by: string;
    theme_id: string | null;
    country_id: string | null;
    likes_count: number;
    created_at: string;
    updated_at: string;
    profile?: User;
    theme?: Theme;
    country?: Country;

}


export interface User {
  id: string;
  user_name: string | null;
  full_name: string | null;
  avatar_url: string | null;
}

export interface Theme {
  id: string;
  name: string;
}

export interface Country {
  id: string;
  name: string;
  code: string;
}

export interface Tip {
  id: string;
  title: string;
  content: string;
  created_by: string;
  theme_id: string | null;
  country_id: string | null;
  likes_count: number;
  created_at: string;
  updated_at: string;
  profile: User;
  theme: Theme;
  country: Country;
}



  
  export interface Theme {
    id: string;
    name: string;
  }
  
  export interface Country {
    id: string;
    name: string;
  }
  

  
  export interface DataTips { 
  tips: Tip[];
  userId: string | undefined;
  }

  export interface TipsSectionProps {
    data: DataTips;
    title: string;
    iconTitle: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>
  }
  export interface TipsFull {
    id: string;
    title: string;
    content: string;
    created_by: string;
    theme_id: string | null;
    country_id: string | null;
    likes_count: number;
    created_at: string;
    updated_at: string;
    profile: {
      id: string;
      user_name: string;
      full_name: string;
      avatar_url: string;
    };
    theme: {
      id: string;
      name: string;
    };
    country: {
      id: string;
      name: string;
      code: string;
    };
    comments: Array<{
      id: string;
      content: string;
      created_at: string;
      user_id: string;
      profile: {
        id: string;
        user_name: string;
        avatar_url: string;
        full_name: string;
      };
    }>;
  }

  export interface ListItemGenericFull {
    id: string;
    title: string;
    content: string;
    created_by: string;
    theme_id: string | null;
    country_id: string | null;
    likes_count: number;
    created_at: string;
    updated_at: string;
    profile: {
      id: string;
      user_name: string;
      full_name: string;
      avatar_url: string;
    };
    theme: {
      id: string;
      name: string;
    };
    country: {
      id: string;
      name: string;
      code: string;
    };
    comments: Array<{
      id: string;
      content: string;
      created_at: string;
      user_id: string;
      profile: {
        id: string;
        user_name: string;
        avatar_url: string;
        full_name: string;
      };
    }>;
  }