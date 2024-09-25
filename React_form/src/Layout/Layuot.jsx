import {
  AppShell,
  Burger,
  Flex,
  Group,
  NavLink,
  ThemeIcon,
  Button,
  Menu,
  Avatar,
  Text,
  UnstyledButton,
} from "@mantine/core";
import { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { useNavigate, Outlet, NavLink as Nl } from "react-router-dom";
import {
  IconActivity,
  IconShoppingCart,
  IconBrandProducthunt,
  IconSettings,
  IconLogout,
} from "@tabler/icons-react";

// import "@mantine/core/styles.css";

function Layout() {
  const navigate = useNavigate();
  const handleclick = () => console.log("OUCH");
  const [Active, setActive] = useState(() => {
    const Activenav = localStorage.getItem("Activenav");
    return Activenav ? parseInt(Activenav) : 0;
  });

  const [opened, { toggle }] = useDisclosure();

  //เพิ่มหนาได้ตรงนี้
  const data = [
    {
      title: "Your requests",
      // path: "/testp",
      icon: (
        <ThemeIcon variant="light" color="dark" size={"md"}>
          <IconBrandProducthunt style={{ width: "70%", height: "70%" }} />
        </ThemeIcon>
      ),
    },
    {
      title: "Has Responsed",
      // path: "/testp",
      icon: (
        <ThemeIcon variant="light" color="dark" size={"md"}>
          <IconBrandProducthunt style={{ width: "70%", height: "70%" }} />
        </ThemeIcon>
      ),
    },
  ];

  const HandleNavClick = (path, index) => {
    setActive(index);
    localStorage.setItem("Activenav", index.toString());
    toggle();
  };

  const handleClick_addt = (path, index) => {
    alert("Add out button");
  };

  const handleClick_signout = (path, index) => {
    navigate("/testp");
    console.log("signout");
  };

  return (
    <>
      <AppShell
        header={{ height: 60 }}
        navbar={{
          width: 270,
          breakpoint: "sm",
          collapsed: { mobile: !opened },
        }}
        padding="md"
      >
        <AppShell.Header>
          <Group h="100%" px="md" justify="space-between">
            <Flex>
              <Burger
                opened={opened}
                onClick={toggle}
                hiddenFrom="sm"
                size="sm"
                style={{ fontSize: 50 }} // เพิ่ม style ของ fontSize
              />
              แบบบันทึกการอัพเดทข้อมูลบนเว็บไซต์
            </Flex>
            <Flex>
              <Menu shadow="md" width={200}>
                <Menu.Target>
                  <UnstyledButton>
                    <Group spacing="xs">
                      <Avatar src={null} alt="User" radius="xl" />
                      <Text>Profile</Text>
                    </Group>
                  </UnstyledButton>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item icon={<IconSettings size={14} />}>
                    Settings
                  </Menu.Item>
                  <Menu.Item
                    icon={<IconLogout size={14} />}
                    onClick={handleClick_signout}
                  >
                    Sign out
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </Flex>{" "}
          </Group>
        </AppShell.Header>
        <AppShell.Navbar p="md">
          <Flex direction={"column"}>
            {data.map((i, key) => (
              <div style={{ margin: "5px" }}>
                <NavLink
                  key={key}
                  // onClick={() => HandleNavClick(i.path, key)}
                  active={key === Active}
                  component={Nl}
                  to={i.path}
                  label={i.title}
                  leftSection={i.icon}
                />
              </div>
            ))}
          </Flex>
        </AppShell.Navbar>
        <AppShell.Main
          bg={"#f8f9fa"}
          px={{ base: 5, sm: 0 }}
          pl={{ base: 0, md: 295 }}
        >
          <Outlet />
        </AppShell.Main>
      </AppShell>
    </>
  );
}

export default Layout;
