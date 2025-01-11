"use server";
import {
  addKeyword,
  addListener,
  addPost,
  addTrigger,
  deleteKeywordQuery,
} from "./queries";
import { onCurrentUser } from "../user";
import {
  createAutomation,
  findAutomation,
  getAutomations,
  updateAutomation,
} from "./queries";
import { findUser } from "../user/queries";

export const createAutomations = async (id?: string) => {
  const user = await onCurrentUser();
  try {
    const create = await createAutomation(user.id, id);
    if (create) {
      return {
        status: 200,
        data: "Automation created",
      };
    }
    return { status: 404, data: "Automation not created" };
  } catch (error) {
    return { status: 500, data: "Internal server error" };
  }
};

export const getAllAutomations = async () => {
  const user = await onCurrentUser();
  try {
    const automations = await getAutomations(user.id);
    if (automations) {
      return {
        status: 200,
        data: automations.automations,
      };
    }
    return { status: 404, data: [] };
  } catch (error) {
    return { status: 500, data: [] };
  }
};

export const getAutomationInfo = async (id: string) => {
  await onCurrentUser();
  try {
    const automation = await findAutomation(id);
    if (automation) {
      return {
        status: 200,
        data: automation,
      };
    }
    return { status: 404 };
  } catch (error) {
    return { status: 500 };
  }
};

export const updateAutomationName = async (
  automationId: string,
  data: { name?: string; active?: boolean; automation?: string }
) => {
  await onCurrentUser();
  try {
    const update = await updateAutomation(automationId, data);
    if (update) {
      return {
        status: 200,
        data: "Automation updated",
      };
    }
    return { status: 404, data: "Automation not updated" };
  } catch (error) {
    return { status: 500, data: "Internal server error" };
  }
};

export const saveListner = async (
  automationId: string,
  listner: "SMARTAI" | "MESSAGE",
  prompt: string,
  reply?: string
) => {
  await onCurrentUser();
  try {
    const create = await addListener(automationId, listner, prompt, reply);
    if (create) {
      return {
        status: 200,
        data: "Listener created",
      };
    }
    return { status: 404, data: "Listener not created" };
  } catch (error) {
    return { status: 500, data: "Internal server error" };
  }
};

export const saveTrigger = async (automationId: string, trigger: string[]) => {
  await onCurrentUser();
  try {
    const create = await addTrigger(automationId, trigger);
    if (create) {
      return {
        status: 200,
        data: "Trigger created",
      };
    }
    return { status: 404, data: "Trigger not created" };
  } catch (error) {
    return { status: 500, data: "Internal server error" };
  }
};

export const saveKeyword = async (automationId: string, keyword: string) => {
  await onCurrentUser();
  try {
    const create = await addKeyword(automationId, keyword);
    if (create) {
      return {
        status: 200,
        data: "Keyword created",
      };
    }
    return { status: 404, data: "Keyword not created" };
  } catch (error) {
    return { status: 500, data: "Internal server error" };
  }
};

export const deleteKeyword = async ( id: string) => {
  await onCurrentUser();
  try {
    const deletek = await deleteKeywordQuery(id);
    if (deletek) {
      return {
        status: 200,
        data: "Keyword deleted",
      };
    }
    return { status: 404, data: "Keyword not deleted" };
  } catch (error) {
    return { status: 500, data: "Internal server error" };
  }
};


export const getProfilePosts = async () => {
  const user = await onCurrentUser()
  try {
    const profile = await findUser(user.id)
    const posts = await fetch(
      `${process.env.INSTAGRAM_BASE_URL}/me/media?fields=id,caption,media_url,media_type,timestamp&limit=10&access_token=${profile?.integrations[0].token}`
    )
    const parsed = await posts.json()
    if (parsed) return { status: 200, data: parsed }
    console.log('🔴 Error in getting posts')
    return { status: 404 }
  } catch (error) {
    console.log('🔴 server side Error in getting posts ', error)
    return { status: 500 }
  }
}

export const savePosts = async (
  autmationId: string,
  posts: {
    postid: string
    caption?: string
    media: string
    mediaType: 'IMAGE' | 'VIDEO' | 'CAROSEL_ALBUM'
  }[]
) => {
  await onCurrentUser()
  try {
    const create = await addPost(autmationId, posts)

    if (create) return { status: 200, data: 'Posts attached' }

    return { status: 404, data: 'Automation not found' }
  } catch (error) {
    return { status: 500, data: 'Oops! something went wrong' }
  }
}

export const activateAutomation = async (id: string, state: boolean) => {
  await onCurrentUser()
  try {
    const update = await updateAutomation(id, { active: state })
    if (update)
      return {
        status: 200,
        data: `Automation ${state ? 'activated' : 'disabled'}`,
      }
    return { status: 404, data: 'Automation not found' }
  } catch (error) {
    return { status: 500, data: 'Oops! something went wrong' }
  }
}

