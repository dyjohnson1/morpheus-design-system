import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import {
  Menu,
  MenuTrigger,
  MenuContent,
  MenuItem,
  MenuCheckboxItem,
  MenuRadioGroup,
  MenuRadioItem,
  MenuGroup,
  MenuSeparator,
  MenuSub,
  MenuSubTrigger,
  MenuSubContent,
} from "./Menu";

const meta: Meta<typeof Menu> = {
  title: "Overlay/Menu",
  component: Menu,
  parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj<typeof Menu>;

/* ── Default ────────────────────────────────────────────────────────────── */

export const Default: Story = {
  render: () => (
    <Menu>
      <MenuTrigger>
        <button>Actions</button>
      </MenuTrigger>
      <MenuContent>
        <MenuItem>Edit</MenuItem>
        <MenuItem>Duplicate</MenuItem>
        <MenuSeparator />
        <MenuItem>Archive</MenuItem>
        <MenuItem destructive>Delete</MenuItem>
      </MenuContent>
    </Menu>
  ),
};

/* ── With groups ────────────────────────────────────────────────────────── */

export const WithGroups: Story = {
  render: () => (
    <Menu>
      <MenuTrigger>
        <button>File</button>
      </MenuTrigger>
      <MenuContent>
        <MenuGroup label="Document">
          <MenuItem>New</MenuItem>
          <MenuItem>Open</MenuItem>
          <MenuItem>Save</MenuItem>
        </MenuGroup>
        <MenuSeparator />
        <MenuGroup label="Export">
          <MenuItem>PDF</MenuItem>
          <MenuItem>Markdown</MenuItem>
        </MenuGroup>
      </MenuContent>
    </Menu>
  ),
};

/* ── Checkbox items ─────────────────────────────────────────────────────── */

export const CheckboxItems: Story = {
  render: function CheckboxStory() {
    const [showToolbar, setShowToolbar] = useState(true);
    const [showSidebar, setShowSidebar] = useState(false);

    return (
      <Menu>
        <MenuTrigger>
          <button>View</button>
        </MenuTrigger>
        <MenuContent>
          <MenuCheckboxItem checked={showToolbar} onCheckedChange={setShowToolbar}>
            Toolbar
          </MenuCheckboxItem>
          <MenuCheckboxItem checked={showSidebar} onCheckedChange={setShowSidebar}>
            Sidebar
          </MenuCheckboxItem>
        </MenuContent>
      </Menu>
    );
  },
};

/* ── Radio items ────────────────────────────────────────────────────────── */

export const RadioItems: Story = {
  render: function RadioStory() {
    const [theme, setTheme] = useState("dark");

    return (
      <Menu>
        <MenuTrigger>
          <button>Theme</button>
        </MenuTrigger>
        <MenuContent>
          <MenuRadioGroup value={theme} onValueChange={setTheme}>
            <MenuRadioItem value="light">Light</MenuRadioItem>
            <MenuRadioItem value="dark">Dark</MenuRadioItem>
            <MenuRadioItem value="system">System</MenuRadioItem>
          </MenuRadioGroup>
        </MenuContent>
      </Menu>
    );
  },
};


/* ── With submenu ───────────────────────────────────────────────────────── */

export const WithSubmenu: Story = {
  render: () => (
    <Menu>
      <MenuTrigger>
        <button>Options</button>
      </MenuTrigger>
      <MenuContent>
        <MenuItem>Cut</MenuItem>
        <MenuItem>Copy</MenuItem>
        <MenuItem>Paste</MenuItem>
        <MenuSeparator />
        <MenuSub>
          <MenuSubTrigger>Share</MenuSubTrigger>
          <MenuSubContent>
            <MenuItem>Email</MenuItem>
            <MenuItem>Slack</MenuItem>
            <MenuItem>Copy link</MenuItem>
          </MenuSubContent>
        </MenuSub>
      </MenuContent>
    </Menu>
  ),
};

/* ── Disabled items ─────────────────────────────────────────────────────── */

export const DisabledItems: Story = {
  render: () => (
    <Menu>
      <MenuTrigger>
        <button>Edit</button>
      </MenuTrigger>
      <MenuContent>
        <MenuItem>Undo</MenuItem>
        <MenuItem disabled>Redo</MenuItem>
        <MenuSeparator />
        <MenuItem>Cut</MenuItem>
        <MenuItem disabled>Paste</MenuItem>
      </MenuContent>
    </Menu>
  ),
};

/* ── Destructive ────────────────────────────────────────────────────────── */

export const Destructive: Story = {
  render: () => (
    <Menu>
      <MenuTrigger>
        <button>Danger zone</button>
      </MenuTrigger>
      <MenuContent>
        <MenuItem>Edit settings</MenuItem>
        <MenuItem>Transfer ownership</MenuItem>
        <MenuSeparator />
        <MenuItem destructive>Delete project</MenuItem>
      </MenuContent>
    </Menu>
  ),
};

/* ── All states matrix ──────────────────────────────────────────────────── */

export const AllStates: Story = {
  render: function AllStatesStory() {
    const [checked, setChecked] = useState(true);
    const [radio, setRadio] = useState("a");

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 80,
          alignItems: "center",
          padding: 120,
        }}
      >
        {/* Basic items */}
        <section>
          <p
            style={{
              color: "var(--morph-color-on-surface-muted)",
              fontSize: 12,
              marginBottom: 24,
              textAlign: "center",
            }}
          >
            Basic menu with all item types
          </p>
          <Menu open>
            <MenuTrigger>
              <button>All item types</button>
            </MenuTrigger>
            <MenuContent>
              <MenuGroup label="Actions">
                <MenuItem>Regular item</MenuItem>
                <MenuItem disabled>Disabled item</MenuItem>
                <MenuItem destructive>Destructive item</MenuItem>
              </MenuGroup>
              <MenuSeparator />
              <MenuCheckboxItem checked={checked} onCheckedChange={setChecked}>
                Checkbox item
              </MenuCheckboxItem>
              <MenuSeparator />
              <MenuRadioGroup value={radio} onValueChange={setRadio}>
                <MenuRadioItem value="a">Radio A</MenuRadioItem>
                <MenuRadioItem value="b">Radio B</MenuRadioItem>
              </MenuRadioGroup>
              <MenuSeparator />
              <MenuSub>
                <MenuSubTrigger>Submenu</MenuSubTrigger>
                <MenuSubContent>
                  <MenuItem>Sub item 1</MenuItem>
                  <MenuItem>Sub item 2</MenuItem>
                </MenuSubContent>
              </MenuSub>
            </MenuContent>
          </Menu>
        </section>
      </div>
    );
  },
};
